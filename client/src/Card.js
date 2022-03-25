import "./card.scss";

const Card = ({ hidden, name, color, points }) => {
  const displayPoints = points === true ? "✓" : points || "…";

  return (
    <div className="card" style={{ borderColor: color, color: color }}>
      <div className="card__name">{name}</div>
      <div className="card__points">{displayPoints}</div>
    </div>
  );
};

export default Card;
