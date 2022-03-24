const crypto = require("crypto");
const express = require("express");
const path = require("path");
const pino = require("pino");
const ws = require("ws");

const app = express();

const handlers = require("./handlers");
const messages = require("./messages");
const state = require("./state");

// Set log level
const level = process.env.NODE_ENV === "production" ? "info" : "debug";
const logger = pino({ level });

app.use(express.static(path.resolve(__dirname, "../../client/build")));

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/build/index.html"));
});

const sockets = {};
const wss = new ws.Server({ noServer: true });
wss.on("connection", (ws) => {
  let userID = null;
  let sessionID = null;

  const setUserID = (id) => {
    userID = id;
    sockets[userID] = ws;
  };
  const setSessionID = (id) => {
    sessionID = id;
  };
  const send = (msg) => ws.send(JSON.stringify(msg));
  const broadcast = (msg) => {
    const session = state.session(sessionID);
    if (session) {
      Object.keys(session.users).forEach((id) => {
        const socket = sockets[id];
        socket.send(JSON.stringify(msg));
      });
    }
  };

  ws.on("close", (code, reason) => {
    // Remove user from their session
    handlers["close"]({ userID, sessionID, broadcast });
    delete sockets[userID];
  });

  ws.on("message", (data) => {
    try {
      message = JSON.parse(data);
      logger.debug(message, "received");

      handlers[message.type]({
        message,
        userID,
        setUserID,
        sessionID,
        setSessionID,
        send,
        broadcast,
      });
    } catch (err) {
      if (err instanceof state.APIError) {
        send(messages.error(err.message));
        return;
      }

      logger.error(err, "error parsing message");
    }
  });
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  logger.info({ port }, "Server listening");
});
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});
