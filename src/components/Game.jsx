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
      <footer>
        <p>Au tour de {STORE.players[STORE.currentPlayerId].name} ({STORE.currentPlayerId+1})</p>
        {STORE.players.map((p, i) => (
          <span>Joueur {i+1} {p.name} [{p.points} points] | </span>
        ))}
      </footer>
    </>
  );
};

export default Game;
