import { useState } from "react";
import useSocket from "./hooks/useSocket";

const Vote = () => {
  const [currentVote, setCurrentVote] = useState(null);
  const { send } = useSocket();

  const vote = (points) => {
    if (points === currentVote) {
      setCurrentVote(null);
      send({ type: "vote" });
      return;
    }

    setCurrentVote(points);
    send({
      type: "vote",
      points,
    });
  };

  return (
    <div className="vote">
      <div className="vote_buttons">
        <h4>Your Vote:</h4>
        {[1, 2, 3, 5, 8, 13, 99, "?", "☕"].map((points) => {
          let className =
            points === currentVote ? "button" : "button button--inactive";
          return (
            <button
              className={className}
              key={`vote-${points}`}
              onClick={() => vote(points)}
            >
              {points}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Vote;
