const crypto = require('crypto');
const express = require('express');
const pino = require('pino');
const ws = require('ws');

const app = express();

const users = {};
const sessions = {};

const generateUserID = () => {
  return crypto.randomUUID();
};

const login = message => {
  const id = generateUserID();
  const user = {
    id,
    name: message.name,
    color: message.color
  };
  users[id] = user;
  return user;
};

const generateSessionID = () => {
  while (true) {
    let id = '';
    for (let i = 0; i < 4; i++) {
      id = id + String.fromCharCode(65 + crypto.randomInt(26));
    }

    if (sessions[id] === undefined) {
      sessions[id] = true;
      return id;
    }
  };
};

const createSession = () => {
  const id = generateSessionID();
  const session = {
    id,
    created: Date.now()
  };

  sessions[id] = session;

  return session;
};

// Set log level
const level = process.env.NODE_ENV === "production" ? 'info' : 'debug';
const logger = pino({ level });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const wss = new ws.Server({ noServer: true });
wss.on('connection', ws => {
  ws.on('message', data => {
    try {
      message = JSON.parse(data);
      logger.debug(message, 'received');

      switch(message.type) {
      case 'login':
        const user = login(message);
        ws.send(JSON.stringify({
          type: 'login',
          user
        }));
        break;
      case 'createSession':
        const session = createSession();
        ws.send(JSON.stringify({
          type: 'sessionCreated',
          session
        }));
        break;
      }
    } catch (err) {
      logger.error(err, 'error parsing message');
    }
  });
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  logger.info({ port }, 'Server listening');
});
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, socket => {
    wss.emit('connection', socket, request);
  });
});
