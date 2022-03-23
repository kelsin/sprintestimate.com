import { useSelector } from 'react-redux';

import Card from './Card';

const getResult = (votes, users) => {
  let count = 0;
  let total = 0;
  Object.keys(votes).forEach(userID => {
    const value = votes[userID];
    if(!isNaN(value) && users[userID]) {
      count += 1;
      total += value;
    }
  });
  const avg = total / count;
  let result = 1;
  [99,13,8,5,3,2,1].forEach(point => {
    if (avg <= point) {
      result = point;
    }
  });

  return result;
};

const PastVote = ({ users, vote }) => {
  const cards = Object.keys(users).map(id => {
    const user = users[id];
    const points = vote.votes[id];
    return (
      <div key={`past-vote-${id}`} className="col">
        <Card name={user.name} color={user.color} points={points}/>
      </div>
    );
  });

  const topic = vote ? (vote.topic.startsWith("http") ? <a target="_blank" href={vote.topic}>{vote.topic}</a> : vote.topic) : null;
  const result = getResult(vote.votes, users);

  return (
    <div className="row">
      <div className="col">
        <h3>{topic}</h3>
      </div>
      {cards}
      <div className="col">
        <h1>{result}</h1>
      </div>
    </div>
  );
};

const PastVotes = () => {
  const { users, past } = useSelector(state => state.session);

  const votes = [...past].reverse();

  return votes.map((vote, i) => {
    return <PastVote key={`past-vote-${i}`} users={users} vote={vote} />
  });
};

export default PastVotes;
