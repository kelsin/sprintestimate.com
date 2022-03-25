import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import useSocket from "./hooks/useSocket";
import useUser from "./hooks/useUser";

import "./home.scss";

const Home = () => {
  const { send } = useSocket();
  const [user] = useUser();
  const navigate = useNavigate();
  const [id, setID] = useState("");

  // Redirect to /user page if you don't have user data at all
  if (!user.name) {
    return <Navigate to="/user" />;
  }

  const newSession = () => {
    send({
      type: "createSession",
    });
  };

  const joinSession = () => {
    navigate(`/${id}`);
  };

  return (
    <div className="page">
      <h1>Sprint Estimate</h1>
      <p>
        Create a sesion and invite your coworkers to easily play planning poker!
      </p>
      <div className="form">
        <button className="button" onClick={newSession}>
          New Session
        </button>
      </div>
      <p>If you have a session code from a friend, enter it here to join in!</p>
      <div className="form join_session">
        <input
          className="join_session__input"
          type="text"
          value={id}
          onChange={(event) => setID(event.target.value)}
          placeholder="Session ID"
        />
        <button className="button join_session__button" onClick={joinSession}>
          Join Session
        </button>
      </div>
    </div>
  );
};

export default Home;
