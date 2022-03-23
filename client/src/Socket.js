import { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addError } from './store/errors';
import { sessionCreated, updateSession } from './store/session';
import useUser from './hooks/useUser';

export const Context = createContext();

export const url = process.env.NODE_ENV === "development" ?
      'ws://localhost:3001/' :
      window.location.origin.replace(/^http/, 'ws') + '/';

const ws = new WebSocket(url);
ws.onopen = event => {
  console.log(`Websocket open to ${url}`);
};

const Socket = ({ children }) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useUser();

  const handler = event => {
    try {
      const message = JSON.parse(event.data);

      console.log("Received message", message);

      switch(message.type) {
      case 'login':
        setUser(message.user);
        break;
      case 'sessionCreated':
        navigator.clipboard.writeText(url + message.session.id);
        dispatch(sessionCreated(message.session));
        navigate(`/${message.session.id}`);
        break;
      case 'updateSession':
        dispatch(updateSession(message.session));
        navigate(`/${message.session.id}`);
        break;
      case 'error':
        dispatch(addError(message.message));
        break;
      }
    } catch (err) {
      console.log("Error parsing message:", event.data);
    }
  };

  useEffect(() => {
    ws.addEventListener("message", handler);

    return () => {
      ws.removeEventListener("message", handler);
    };
  });

  const send = message => ws.send(JSON.stringify(message));
  const ctx = {ws, send};

  return (
    <Context.Provider value={ctx}>
      {children}
    </Context.Provider>
  );
};

export default Socket;
