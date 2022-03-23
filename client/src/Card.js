import "./card.scss";

const Card = ({ hidden, name, color, points }) => {
  const displayPoints = points === true ? "✓" : points || "…";

  return (
    <div className="card" style={{ borderColor: color, color: color }}>
      <div className="card--name">{name}</div>
      <div className="card--points">{displayPoints}</div>
    </div>
  );
};

export default Card;
