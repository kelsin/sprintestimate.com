import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addError } from "./store/errors";
import { sessionCreated, updateSession } from "./store/session";
import useUser from "./hooks/useUser";

export const Context = createContext();

export const timeout = 500;
export const url =
  process.env.NODE_ENV === "development"
    ? "ws://localhost:3001/"
    : window.location.origin.replace(/^http/, "ws") + "/";

const initialWS = new WebSocket(url);

const Socket = ({ children }) => {
  const [ws, setWS] = useState(initialWS);
  const [connected, setConnected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useUser();
  const session = useSelector((state) => state.session);

  const send = (message) => ws.send(JSON.stringify(message));
  const ctx = { ws, send, connected };

  useEffect(() => {
    const effectSend = (message) => ws.send(JSON.stringify(message));

    const onOpen = (event) => {
      setConnected(true);
      console.log(`Websocket open to ${url}`);
      if (user && user.name) {
        effectSend({ type: "login", ...user });
        if (session.id) {
          effectSend({ type: "joinSession", sessionID: session.id });
        }
      }
    };

    const onClose = (event) => {
      setConnected(false);
      console.log("Websocket dissconnected");

      setTimeout(() => {
        setWS(new WebSocket(url));
      }, timeout);
    };

    const onMessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        console.log("Received message", message);

        switch (message.type) {
          case "login":
            setUser(message.user);
            break;
          case "sessionCreated":
            navigator.clipboard.writeText(url + message.session.id);
            dispatch(sessionCreated(message.session));
            navigate(`/${message.session.id}`);
            break;
          case "updateSession":
            dispatch(updateSession(message.session));
            navigate(`/${message.session.id}`);
            break;
          case "error":
            dispatch(addError(message.message));
            break;
          default:
            console.error("Unknown message type", message);
        }
      } catch (err) {
        console.log("Error parsing message:", event.data);
      }
    };

    ws.addEventListener("open", onOpen);
    ws.addEventListener("close", onClose);
    ws.addEventListener("message", onMessage);

    return () => {
      ws.removeEventListener("open", onOpen);
      ws.removeEventListener("close", onClose);
      ws.removeEventListener("message", onMessage);
    };
  }, [ws, setWS, dispatch, navigate, setUser, user, session]);

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
};

export default Socket;
