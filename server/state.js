const crypto = require('crypto');

const users = {};
const sessions = {};

class APIError extends Error {};
exports.APIError = APIError;

const generateUserID = () => {
  return crypto.randomUUID();
};

const login = message => {
  const user = {
    id: message.id || generateUserID(),
    name: message.name,
    color: message.color
  };
  users[user.id] = user;
  return user;
};
exports.login = login;

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

const createSession = (userID) => {
  if (!userID) {
    throw new APIError("Must log in before creating a session");
  }

  const id = generateSessionID();
  const session = {
    id,
    created: Date.now(),
    creator: userID,
    users: { [userID]: users[userID] },
    current: null,
    past: []
  };

  sessions[id] = session;

  return session;
};
exports.createSession = createSession;

const joinSession = (userID, sessionID) => {
  const session = sessions[sessionID];

  if (!session) {
    throw new APIError("Session Not Found");
  }

  const user = users[userID];

  if (!user) {
    throw new APIError("User Not Found");
  }

  session.users[userID] = user
  return session;
};
exports.joinSession = joinSession;

const vote = (userID, sessionID, points) => {
  const session = sessions[sessionID];

  if (!session) {
    throw new APIError("Session Not Found");
  }

  if (points) {
    session.current.votes[userID] = points;
  } else {
    delete session.current.votes[userID];
  }

  return session;
};
exports.vote = vote;

const newVote = (userID, sessionID, topic) => {
  const session = sessions[sessionID];

  if (!session) {
    throw new APIError("Session Not Found");
  }

  if (session.creator !== userID) {
    throw new APIError("Only the session creator can finish a vote");
  }

  if (session.current) {
    session.past.push(session.current);
  }

  session.current = {
    votes: {},
    topic
  };

  return session;
};
exports.newVote = newVote;

const session = (sessionID) => {
  return sessions[sessionID];
};
exports.session = session;

const removeUser = (userID, sessionID) => {
  const session = sessions[sessionID];

  if (session.users) {
    delete session.users[userID];
  }

  return session;
};
exports.removeUser = removeUser;
