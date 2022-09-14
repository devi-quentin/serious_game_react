import { useContext } from "react";
import { Ctx } from "./store";
import Cell from "./Cell";
const Board = () => {
  const STORE = useContext(Ctx);

  // RENDER
  return (
    <>
      <div className="board">
        <Cell key={0} question={{ number: "🏁" }} />
        {STORE.questions.map((q, i) => (
          <Cell key={i} question={q}/>
        ))}
        <Cell key={100} question={{ number: "🚩" }} />
      </div>
    </>
  );
};

export default Board;
