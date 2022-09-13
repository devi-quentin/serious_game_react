import { useContext } from "react";
import Cell from "./Cell";
import { Ctx } from "./store";
const Board = () => {
  const STORE = useContext(Ctx);

  return (
    <>
      <div className="board">
        {STORE.questions.map((q, i) => (
            <Cell key={i} question={q}/>
        ))}
      </div>
    </>
  );
};

export default Board;
