import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import CurrentVote from "./CurrentVote";
import PastVotes from "./PastVotes";

import useSocket from "./hooks/useSocket";
import useUser from "./hooks/useUser";

const Session = () => {
  const { send, connected } = useSocket();
  const params = useParams();
  const session = useSelector((state) => state.session);
  const [user] = useUser();
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (connected && !joined && user.id && (!session.id || params.id !== session.id)) {
      send({
        type: "joinSession",
        sessionID: params.id,
      });
      setJoined(true);
    }
  }, [send, connected, user, session, params, joined, setJoined]);

  // Redirect to /user page if you don't have user data at all
  if (!user.name) {
    return <Navigate to={`/user?redirect=/${params.id}`} />;
  }

  if (!session.id || params.id !== session.id) {
    return (
      <div className="page">
        <h1>Joining {params.id}</h1>
      </div>
    );
  }

  const url = `${window.location.origin}/${params.id}`;
  const copyURLHandler = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="page">
      <h1>Session {params.id}</h1>
      <h4 className="session_link">
        🔗{" "}
        <button type="button" onClick={copyURLHandler}>
          {url}
        </button>
      </h4>
      <CurrentVote />
      <PastVotes />
    </div>
  );
};

export default Session;
