import store from './store';
import { sessionCreated } from './store/session';
import { login } from './store/user';

const url = process.env.NODE_ENV === "development" ? 'ws://localhost:3001/' : window.location.origin.replace(/^http/, 'ws') + '/';
const ws = new WebSocket(url);

ws.onopen = event => {
  console.log(`Websocket open to ${url}`);
};

ws.onmessage = event => {
  try {
    const message = JSON.parse(event.data);

    console.log("Received message", message);

    switch(message.type) {
    case 'login':
      store.dispatch(login(message.user));
      break;
    case 'sessionCreated':
      store.dispatch(sessionCreated(message.session));
      break;
    }
  } catch (err) {
    console.log("Error parsing message:", event.data);
  }
};

export const sendMessage = message => ws.send(JSON.stringify(message));
