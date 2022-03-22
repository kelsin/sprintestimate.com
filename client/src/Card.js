import "./card.scss";

const Card = ({ hidden, name, color, points }) => {
  return (
    <div className="card" style={{borderColor: color, color: color}}>
      <div className="card--name">{name}</div>
      <div className="card--points">{points}</div>
    </div>
  );
};

export default Card;
