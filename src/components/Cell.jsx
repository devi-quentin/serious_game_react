import { useEffect, useState, useRef } from "react";

const Cell = ({ question, players = null}) => {
  // INIT
  let [themeClass, setThemeClass] = useState("");
  let [playerPion, setPlayerPion] = useState(null);
  let [visited, setVisited] = useState(false);

  // REACTION
  const playerInCase = () => {
    // Si un joueur est passé dans le composant case
    if (players != null) {
      // Pour chaque joueur
      players.forEach((p, i) => {
        // On check s'il est sur cette case
        if (p.position === question.number) {
          // Si oui, le pion vaut son numéro
          setPlayerPion(i + 1);
        }
      });
    }
  };

  useEffect(() => {
    setPlayerPion(null);
    playerInCase();
  });

  const setColor = (theme) => {
    switch (theme) {
      case "Théorie":
        setThemeClass("theorie");
        break;

      case "Domestique":
        setThemeClass("domestique");
        break;

      case "Économique":
        setThemeClass("economique");
        break;

      case "Publique / politique":
        setThemeClass("publique");
        break;

      default:
        setThemeClass("null");
        break;
    }
  };

  useEffect(() => {
    setColor(question.theme);
  });

  // RENDER
  return (
    <div className={themeClass + " cell"} id={"cell_" + question.number}>
      <div className="cell_number">{question.number}</div>
      <div className={"cell_player _" + playerPion}>{playerPion}</div>
      {question.challenge ? <div className={"cell_challenge"}>?</div> : ""}
      <div className={"cell_visited " + (question.visited ? "visited" : "")}>👣</div>
    </div>
  );
};

export default Cell;
