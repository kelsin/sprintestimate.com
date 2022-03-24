import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import CurrentVote from "./CurrentVote";
import PastVotes from "./PastVotes";

import useSocket from "./hooks/useSocket";
import useUser from "./hooks/useUser";

const Session = () => {
  const { send, connected } = useSocket();
  const [copied, setCopied] = useState("");
  const params = useParams();
  const session = useSelector((state) => state.session);
  const [user] = useUser();

  useEffect(() => {
    if (connected && user.id && (!session.id || params.id !== session.id)) {
      send({
        type: "joinSession",
        sessionID: params.id,
      });
    }
  }, [send, connected, user, session, params]);

  // Redirect to /user page if you don't have user data at all
  if (!user.name) {
    return <Navigate to={`/user?redirect=/${params.id}`} />;
  }

  if (!session.id || params.id !== session.id) {
    return (
      <div className="container">
        <h1>Joining {params.id}</h1>
      </div>
    );
  }

  const url = `${window.location.origin}/${params.id}`;
  const copyURLHandler = () => {
    navigator.clipboard.writeText(url).then(() => setCopied(" - copied!"));
  };

  return (
    <div className="container">
      <h1>Session {params.id}</h1>
      <h5>
        🔗{" "}
        <button type="button" className="btn btn-link" onClick={copyURLHandler}>
          {url}
        </button>
        {copied}
      </h5>
      <CurrentVote />
      <PastVotes />
    </div>
  );
};

export default Session;
