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
    <div className="row">
      <div className="col">
        <div className="btn-group">
          {[1, 2, 3, 5, 8, 13, 99, "?", "☕"].map((points) => {
            let className =
              points === currentVote
                ? "btn btn-primary"
                : "btn btn-outline-primary";
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
    </div>
  );
};

export default Vote;
