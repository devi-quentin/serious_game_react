import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Ctx } from "./store";

const Home = () => {
  // INIT
  const STORE = useContext(Ctx);
  const [players, setPlayers] = useState([
    { name: "", points: 0, position: 0 },
  ]);
  const [goPlay, setGoPlay] = useState(false)

  // REACTION
  const handleSubmit = (e) => {
    e.preventDefault();
    const playersTMP = [...players];
    // Id du dernier input
    const id = e.target[e.target.length-2].dataset.id;
    // Ajout du nom
    playersTMP[id].name = e.target[e.target.length-2].value;
    setPlayers([...playersTMP, { name: "", points: 0, position: 0 }]);
  };

  const play = e => {
    e.preventDefault()

    // On stock les joueurs dans le store
    STORE.setPlayers([...players])

    setGoPlay(true)

    return <Navigate to='/'/>
    
  }

  const Redirect = () => {
    return goPlay ? <Navigate to='/'/> : ""
  }

  //RENDER
  return (
    <>
      <h1>Serious Game</h1>
      <p>Par Quentin Devillers</p>

      <form action="" onSubmit={handleSubmit}>
        {players.map((p, i) => (
          <input
            key={i}
            defaultValue={players[i].name}
            data-id={i}
            type="text"
            id={"player_" + (i + 1)}
            placeholder={"Nom joueur " + (i + 1)}
          />
        ))}
        <button>Ajouter</button>
      </form>
      <button onClick={play}>Jouer</button>

      <Redirect/>
    </>
  );
};

export default Home;
