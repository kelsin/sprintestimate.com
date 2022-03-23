import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import useSocket from "./hooks/useSocket";
import useUser from "./hooks/useUser";

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
    <div className="container">
      <h1>Home</h1>
      <button className="btn btn-primary me-3" onClick={newSession}>
        New Session
      </button>
      <input
        type="text"
        value={id}
        onChange={(event) => setID(event.target.value)}
        placeholder="Session ID"
      />
      <button className="btn btn-primary me-3" onClick={joinSession}>
        Join Session
      </button>
    </div>
  );
};

export default Home;
