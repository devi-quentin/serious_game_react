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
        {/* Panneau du plateau, à gauche*/}
        <div className="boardPanel">
          <Board />
          <Dice />
        </div>
        {/* Panneau de la question active, à droite, auquel on passe la question active */}
        <div className="questionPanel">
          <Question q={STORE.questions[STORE.players[STORE.currentPlayerId].position - 1]}/>
        </div>
      </main>
      <footer>Joueur {STORE.currentPlayerId+1} {STORE.players[STORE.currentPlayerId].name} | Est à la case {STORE.players[STORE.currentPlayerId].position} avec {STORE.players[STORE.currentPlayerId].points} points</footer>
    </>
  );
};

export default Game;
