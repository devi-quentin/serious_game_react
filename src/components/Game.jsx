import Board from "./Board";
import Dice from "./Dice";
import Question from "./Question";
import { useContext, useState } from "react";
import { Ctx } from "./store";

const Game = () => {
  // INIT
  const STORE = useContext(Ctx);

  //RENDER
  return (
    <>
      <main>
        <div className="boardPanel">
          <Board />
        </div>
        <div className="questionPanel">
          <Question q={STORE.questions[STORE.players[STORE.currentPlayerId].position - 1]}/>
        </div>
      </main>
      <Dice />
      <footer>Joueur actuel : {STORE.currentPlayerId} [case {STORE.players[STORE.currentPlayerId].position} avec {STORE.players[STORE.currentPlayerId].points} points]</footer>
    </>
  );
};

export default Game;
