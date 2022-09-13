import Board from "./Board";
import Dice from "./Dice";
import Question from "./Question";

const Game = () => {
  return (
    <>
      <main>
        <div className="boardPanel">
          <Board />
        </div>
        <div className="questionPanel">
          <Question />
        </div>
      </main>
      <Dice />
    </>
  );
};

export default Game;
