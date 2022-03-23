const error = message => ({
  type: "error",
  message
});
exports.error = error;

const login = user => ({
  type: 'login',
  user
});
exports.login = login;

const sessionCreated = session => ({
  type: 'sessionCreated',
  session
});
exports.sessionCreated = sessionCreated;

const updateSession = session => ({
  type: 'updateSession',
  session
});
exports.updateSession = updateSession;
