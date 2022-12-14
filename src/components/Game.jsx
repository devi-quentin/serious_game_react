import Board from "./Board";
import Dice from "./Dice";
import Question from "./Question";
import { useContext, useState } from "react";
import { Ctx } from "./store";
import ChronoGlobal from "./ChronoGlobal";

const Game = () => {
  // INIT
  const STORE = useContext(Ctx);

  //RENDER
  return (
    <>
      <header>
        <h1>
          <Dice /> Au tour de (J{STORE.currentPlayerId + 1}){" "}
          {STORE.players[STORE.currentPlayerId].name}
        </h1>
        <h1><ChronoGlobal /></h1>
      </header>
      <main>
        {/* Panneau du plateau, à gauche*/}
        <div className="boardPanel">
          <Board />
        </div>
        {/* Panneau de la question active, à droite, auquel on passe la question active */}
        <div
          className={
            "questionPanel " + (!STORE.questionVisible ? "hidden" : "")
          }
        >
          <Question
            q={
              STORE.questions[STORE.players[STORE.currentPlayerId].position - 1]
            }
          />
        </div>
      </main>
      <footer>
        {STORE.players.map((p, i) => (
          <span key={i}>
            J{i + 1} {p.name} - {p.points} pts |{" "}
          </span>
        ))}
      </footer>
    </>
  );
};

export default Game;
