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
    <div className="new_vote">
      <input
        className="new_vote__input"
        type="text"
        value={topic}
        placeholder="Topic"
        onChange={topicHandler}
      />
      <button className="button new_vote__button" onClick={newVoteHandler}>
        New Vote
      </button>
    </div>
  );
};

export default NewVote;
