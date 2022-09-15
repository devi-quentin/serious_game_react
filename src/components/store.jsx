import { createContext, useState, useEffect } from "react";
const Ctx = createContext();

const Storage = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentPlayerId, setCurrentPlayerId] = useState(0);
  const [players, setPlayers] = useState([
    { name: "Quentin", points: 0, position: 0 },
    { name: "Harry", points: 0, position: 0 },
    { name: "Vincent", points: 0, position: 0 },
  ]);

  const nextPlayer = () => {
    if (currentPlayerId === players.length - 1) {
      setCurrentPlayerId(0);
    } else {
      setCurrentPlayerId(currentPlayerId + 1);
    }
  };

  const getAPI = async () => {
    let rep = await fetch(
      "https://killer-cepegra.xyz/cockpit-ingrwf10/api/content/items/questions?sort=%7Bnumber%3A%22asc%22%7D"
    );
    setQuestions(await rep.json());
  };

  useEffect(() => {
    getAPI();
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
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export { Storage, Ctx };
