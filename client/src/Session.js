import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import CurrentVote from "./CurrentVote";
import PastVotes from "./PastVotes";

import useSocket from "./hooks/useSocket";

const Session = () => {
  const { send, connected } = useSocket();
  const [copied, setCopied] = useState("");
  const params = useParams();
  const session = useSelector((state) => state.session);

  useEffect(() => {
    if (connected) {
      send({
        type: "joinSession",
        sessionID: params.id,
      });
    }
  }, [send, connected, params.id]);

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
