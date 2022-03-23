import { useSelector } from 'react-redux';

import useUser from './hooks/useUser';
import useSocket from './hooks/useSocket';
import Card from './Card';
import NewVote from './NewVote';
import Vote from './Vote';

const CurrentVote = () => {
  const { users, current } = useSelector(state => state.session);
  const [send] = useSocket();
  const [currentUser] = useUser();

  let cards = null;
  if (current) {
    cards = Object.keys(users).map(id => {
      const user = users[id];
      const points = id === currentUser.id ? current.votes[id] : !!current.votes[id];
      return (
        <div key={`current-vote-${id}`} className="col">
          <Card name={user.name} color={user.color} points={points}/>
        </div>
      );
    });
  }

  const doneHandler = () => {
    send({
      type: "voteDone"
    });
  };

  const topic = current ? (current.topic.startsWith("http") ? <a target="_blank" href={current.topic}>{current.topic}</a> : current.topic) : null;

  return (
    <>
      <NewVote/>
      {current && <Vote/>}
      <div className="row">
        <div className="col">
          <h3>{topic}</h3>
        </div>
        {cards}
      </div>
    </>
  );
};

export default CurrentVote;
