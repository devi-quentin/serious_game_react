import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/Home";
import { Storage } from "./components/store";

function App() {
  const [questions, setQuestions] = useState([]);

  const getAPI = async () => {
    let rep = await fetch(
      "https://killer-cepegra.xyz/cockpit-ingrwf10/api/content/items/questions"
    );
    setQuestions(await rep.json());
  };

  useEffect(() => {
    getAPI();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Storage value={{ questions: questions }}>
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
