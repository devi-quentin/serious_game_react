import { useContext } from "react";
import { Ctx } from "./store";
import Cell from "./Cell";
const Board = () => {
  const STORE = useContext(Ctx);

  // RENDER
  return (
    <>
      <div className="board">
        {/* Case de départ */}
        <Cell key={0} question={{ number: "🏁" }} />

        {/* Case 1 à 49 */}
        {STORE.questions.map((q, i) => (
          <Cell key={i} question={q} players={STORE.players}/>
        ))}

        {/* Case d'arrivée */}
        <Cell key={100} question={{ number: "🚩" }} />
      </div>
    </>
  );
};

export default Board;
