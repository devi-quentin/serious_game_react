import { createContext, useState, useEffect } from "react";
const Ctx = createContext();

const Storage = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentPlayerId, setCurrentPlayerId] = useState(0);
  const [players, setPlayers] = useState([
    { name: "Quentin", points: 0, position: 0 },
    { name: "Pierre", points: 0, position: 0 },
    { name: "Olivier", points: 0, position: 0 },
    { name: "Bernadette", points: 0, position: 0 },
  ]);
  const [questionVisible, setQuestionVisible] = useState(false)

  const markCaseVisited = (n) => {
    let questionsTMP = [...questions]
    questionsTMP[n-1].visited = true
  }

  const nextPlayer = () => {
    // Joueur suivant
    if (currentPlayerId === players.length - 1) {
      setCurrentPlayerId(0);
    } else {
      setCurrentPlayerId(currentPlayerId + 1);
    }

    // Si un joueur à fini, on passe au joueur suivant
    if (players[currentPlayerId].position >= questions.length) {
      console.log("joueur fini")
    }
    
    setQuestionVisible(false)    
  };

  const getAPI = async () => {
    let rep = await fetch(
      "https://killer-cepegra.xyz/cockpit-ingrwf10/api/content/items/questions?sort=%7Bnumber%3A%22asc%22%7D"
    );
    setQuestions(await rep.json());
  };

  useEffect(() => {
    getAPI().then(() => {
      
    });
  }, []);

  return (
    <Ctx.Provider
      value={{
        questions: questions,
        players: players,
        setPlayers: setPlayers,
        currentPlayerId: currentPlayerId,
        setCurrentPlayerId: setCurrentPlayerId,
        nextPlayer: nextPlayer,
        markCaseVisited: markCaseVisited,
        questionVisible: questionVisible,
        setQuestionVisible: setQuestionVisible
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export { Storage, Ctx };
