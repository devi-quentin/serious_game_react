import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/Home";
import { Storage } from "./components/store";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Storage>
          <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/start" element={<Home />} />
          </Routes>
        </Storage>
      </BrowserRouter>
    </div>
  );
}

export default App;
