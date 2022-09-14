import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/Home";
import { Storage } from "./components/store";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentPlayerId, setCurrentPlayerId] = useState(0);
  const [players, setPlayers] = useState([
    { name: "Quentin", points: 0, position: 0 },
    { name: "Harry", points: 0, position: 3 },
    { name: "Vincent", points: 0, position: 1 },
  ]);

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
    <div className="App">
      <BrowserRouter>
        <Storage
          value={{
            questions: questions,
            players: players,
            setPlayers: setPlayers,
            currentPlayerId: currentPlayerId,
            setCurrentPlayerId: setCurrentPlayerId,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </Storage>
      </BrowserRouter>
    </div>
  );
}

export default App;
