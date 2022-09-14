const Question = ({ q }) => {
  // INIT

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
      return <></>;
    }
  };

  const DisplayForm = ({ question }) => {
    const { qtype, response } = question;
    if (qtype === "form-unique") {
      return (
        <form className="answerForm">
          {response.answers.map((answer, i) => (
            <div key={i} className="answerForm_answer">
              <input type="radio" name="reponses" id={i} />
              <label htmlFor={i}>{answer}</label>
            </div>
          ))}
          <button>Valider la réponse</button>
        </form>
      );
    }
    if (qtype === "form-multiple") {
      return (
        <form className="answerForm">
          {response.answers.map((answer, i) => (
            <div key={i} className="answerForm_answer">
              <input type="checkbox" name="reponses" id={i} />
              <label htmlFor={i}>{answer}</label>
            </div>
          ))}
          <button>Valider la/les réponse(s)</button>
        </form>
      );
    }
    if (qtype === "challenge") {
      return (
        <>
          <button>Réponse valide</button>
          <button>Réponse NON valide</button>
        </>
      );
    } else {
      return (
        <p>
          Formulaire <strong>{qtype}</strong> ici
        </p>
      );
    }
  };

  // RENDER
  return <DisplayQuestion />;
};

export default Question;
