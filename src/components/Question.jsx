import { useContext } from "react";
import { Ctx } from "./store";

const Question = ({ q }) => {
  // INIT
  const STORE = useContext(Ctx);

  // REACTION
  const DisplayQuestion = () => {
    if (q) {
      return (
        <>
          <p>
            Q{q.number} - {q.timing} sec - {q.theme}
          </p>
          <h2>{q.question}</h2>
          <hr />
          <section className="form">
            <DisplayForm question={q} />
          </section>
        </>
      );
    } else {
      return <h2>Lancer le dé pour commencer</h2>;
    }
  };

  const DisplayForm = ({ question }) => {
    const { qtype, response } = question;
    if (qtype === "form-unique") {
      return (
        <form className="answerForm" onSubmit={checkAnswers}>
          {response.answers.map((answer, i) => (
            <div key={i} className="answerForm_answer">
              <input type="radio" name="reponses" id={i} value={answer} />
              <label htmlFor={i}>{answer}</label>
            </div>
          ))}
          <button>Valider la réponse</button>
        </form>
      );
    }
    if (qtype === "form-multiple") {
      return (
        <form className="answerForm" onSubmit={checkAnswers}>
          {response.answers.map((answer, i) => (
            <div key={i} className="answerForm_answer">
              <input type="checkbox" name="reponses" id={i} value={answer} />
              <label htmlFor={i}>{answer}</label>
            </div>
          ))}
          <button>Valider la/les réponse(s)</button>
        </form>
      );
    }
    if (qtype === "challenge") {
      return (
        <form>
          <button id="valid" onClick={checkAnswers}>Réponse valide</button>
          <button id="invalid" onClick={checkAnswers}>Réponse NON valide</button>
        </form>
      );
    } else {
      return (
        <p>
          Formulaire <strong>{qtype}</strong> ici
        </p>
      );
    }
  };

  const checkAnswers = (e) => {
    e.preventDefault();
    let correct = false;

    // Vérification des formulaires unique et multiple
    if (q.qtype === "form-unique" || q.qtype === "form-multiple") {
      // Récupération des checkbox checked dans un array
      const answers = [...e.target.elements.reponses]
        .map((inpt) => inpt.checked && inpt.value)
        .filter((inpt) => inpt !== false);
      console.log("Bonnes réponses =>", q.response.validAnswers);

      // Vérification que les réponses sont valides
      q.response.validAnswers.every((va, i) => {
        if (va == answers[i]) {
          correct = true;
          return true;
        } else {
          correct = false;
          return false;
        }
      });
    }

    if (q.qtype === "challenge") {
      if (e.target.id === "valid") correct = true
    }

    // Affichage si bonne réponse ou non
    if (correct) {
      const playersTMP = [...STORE.players];
      playersTMP[STORE.currentPlayerId].points++;
      STORE.setPlayers([...playersTMP]);
      STORE.nextPlayer();
      console.log("😀 Bonne réponse. Joueur suivant");
    } else {
      STORE.nextPlayer();
      console.log("😭 Mauvaise réponse. Joueur suivant");
    }
  };

  // RENDER
  return <DisplayQuestion />;
};

export default Question;
