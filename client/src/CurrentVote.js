import { useSelector } from "react-redux";

import useUser from "./hooks/useUser";
import Card from "./Card";
import NewVote from "./NewVote";
import Vote from "./Vote";

const CurrentVote = () => {
  const { users, current, creator } = useSelector((state) => state.session);
  const [currentUser] = useUser();
  const isCreator = currentUser.id === creator;

  let cards = null;
  if (current) {
    cards = Object.keys(users).map((id) => {
      const user = users[id];
      const points =
        id === currentUser.id ? current.votes[id] : !!current.votes[id];
      return (
        <div key={`current-vote-${id}`} className="cards">
          <Card name={user.name} color={user.color} points={points} />
        </div>
      );
    });
  }

  const topic = current ? (
    current.topic.startsWith("http") ? (
      <a target="_blank" rel="noreferrer" href={current.topic}>
        🔗 {current.topic}
      </a>
    ) : (
      current.topic
    )
  ) : null;

  return (
    <>
      {isCreator && <NewVote />}
      {current && <Vote />}
      <div className="vote">
        <div className="vote__topic">
          <h3>{topic}</h3>
        </div>
        <div className="cards">{cards}</div>
      </div>
    </>
  );
};

export default CurrentVote;
