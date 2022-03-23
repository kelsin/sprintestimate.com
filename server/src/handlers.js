const state = require("./state");
const messages = require("./messages");

const map = require("ramda").map;

const login = ({ message, setUserID, send }) => {
  const user = state.login(message);
  setUserID(user.id);
  send(messages.login(user));
};

const createSession = ({ message, userID, setSessionID, send }) => {
  const session = state.createSession(userID);
  setSessionID(session.id);
  send(messages.sessionCreated(session));
};

const joinSession = ({ message, userID, setSessionID, send, broadcast }) => {
  const session = state.joinSession(userID, message.sessionID);
  setSessionID(session.id);
  broadcast(messages.updateSession(session));
};

const vote = ({ message, userID, sessionID, broadcast }) => {
  const session = state.vote(userID, sessionID, message.points);
  broadcast(messages.updateSession(session));
};

const newVote = ({ message, userID, sessionID, broadcast }) => {
  const session = state.newVote(userID, sessionID, message.topic);
  broadcast(messages.updateSession(session));
};

const close = ({ userID, sessionID, broadcast }) => {
  const session = state.removeUser(userID, sessionID);
  broadcast(messages.updateSession(session));
};

module.exports = {
  close,
  login,
  createSession,
  joinSession,
  vote,
  newVote,
};
