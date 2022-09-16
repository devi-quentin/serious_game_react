import { useContext, useState } from "react";
import { Ctx } from "./store";

const Dice = () => {
  //
  const STORE = useContext(Ctx);
  const [diceNumber, setDiceNumber] = useState(0);

  // REACTION
  const rand = () => {
    return Math.ceil(Math.random() * 6);
  };

  const diceRoll = () => {
    const n = rand();
    if (n !== 6) STORE.setQuestionVisible(true)    
    console.log("Lancer du dé -> ", n)
    setDiceNumber(n);
    movePlayer(n);
  };

  const nextChallengeCase = (currentPosition) => {
    // Récupère les prochaines cases challenges
    const nextChallengeCases = STORE.questions.filter(q => q.challenge && q.number > currentPosition && !q.visited).slice(0, 1)
    
    return nextChallengeCases[0].number
  }

  const nextFreeCase = (currentPosition, nCases) => {
    const targetPosition = currentPosition + nCases;

    // SI la case cible est dans le plateau
    if (targetPosition <= STORE.questions.length) {
      // Si la case cible n'est pas visitée ET qu'elle n'est pas une case challenge => OK
      if (
        !STORE.questions[targetPosition - 1].visited &&
        !STORE.questions[targetPosition - 1].challenge
      ) {
        console.log("Case", targetPosition, "disponible")
      }
      // SINON on teste la suivante
      else if (
        !STORE.questions[targetPosition - 1 + 1].visited &&
        !STORE.questions[targetPosition - 1 + 1].challenge
      ) {
        console.log("Case", targetPosition, "+ 1 disponible")
        nCases++;
      }
      // SINON on teste la précédente
      else if (
        !STORE.questions[targetPosition - 1 - 1].visited &&
        !STORE.questions[targetPosition - 1 - 1].challenge
      ) {
        console.log("Case", targetPosition, "- 1 disponible")
        nCases--;
      }
      // SINON le joueur reste à sa place et on passe au joueur suivant
      else {
        nCases = 0;
        STORE.nextPlayer();
      }
    }
    // Si case est en dehors du plateau
    else {
      console.log("Cases cible ", targetPosition, "est en dehors du plateau", STORE.questions.length)
      nCases = STORE.questions.length - currentPosition
      console.log("Le joueur avance de ", nCases, "cases")
    }

    // On retourn le nombre de case à avancer
    return nCases;
  };

  const movePlayer = (n) => {
    const playersTMP = STORE.players;

    // Si le dé affiche 1 à 4
    if (n <= 4) {
      // On fait avancer joueur à la prochaine case libre
      playersTMP[STORE.currentPlayerId].position += nextFreeCase(playersTMP[STORE.currentPlayerId].position, n);
      // On marque la case comme visitée
      STORE.markCaseVisited(playersTMP[STORE.currentPlayerId].position);
    }
    // Si face "CHALLENGE"
    else if (n === 5) {
      playersTMP[STORE.currentPlayerId].position = nextChallengeCase(playersTMP[STORE.currentPlayerId].position)
      STORE.markCaseVisited(playersTMP[STORE.currentPlayerId].position);
    }
    // Face 6 "☹️", passer son tour
    else {
      STORE.nextPlayer();
    }

    STORE.setPlayers([...playersTMP]);
  };

  const DisplayDice = () => {
    if (diceNumber <= 4) return diceNumber;
    if (diceNumber === 5) return "?";
    if (diceNumber === 6) return "🙁";
  };

  // RENDER
  return (
    <button className={"dice"} onClick={diceRoll} disabled={(STORE.questionVisible ? true : false)}>
      {<DisplayDice />}
    </button>
  );
};

export default Dice;
