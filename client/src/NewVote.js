import { useState } from "react";

import useSocket from "./hooks/useSocket";

const NewVote = () => {
  const { send } = useSocket();
  const [topic, setTopic] = useState("");

  const topicHandler = (event) => {
    setTopic(event.target.value);
  };

  const newVoteHandler = () => {
    send({ type: "newVote", topic });
    setTopic("");
  };

  return (
    <div className="row">
      <div className="col">
        <input
          type="text"
          value={topic}
          placeholder="Topic"
          onChange={topicHandler}
        />
        <button className="btn btn-primary" onClick={newVoteHandler}>
          New Vote
        </button>
      </div>
    </div>
  );
};

export default NewVote;
