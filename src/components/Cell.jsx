const Cell = ({ question }) => {
  return (
    <div className="cell">
      <div className="cell_number">{question.number}</div>
    </div>
  );
};

export default Cell;
