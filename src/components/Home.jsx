import { useContext } from "react";
import { Ctx } from "./store";

const Home = () => {
  // INIT
  const STORE = useContext(Ctx);

  // REACTION
  const handleInput = () => {
    
  };

  //RENDER
  return (
    <>
      <h1>Serious Game</h1>
      <p>Par Quentin Devillers</p>

      <form action="" onInput={handleInput}>
        <input type="text" id="player_1" placeholder="Nom joueur 1" />
      </form>
    </>
  );
};

export default Home;
