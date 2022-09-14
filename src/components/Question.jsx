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
        <form className="answerForm" onSubmit={checkAnswers}>
          {response.answers.map((answer, i) => (
            <div key={i} className="answerForm_answer">
              <input type="radio" name="reponses" id={i} value={answer}/>
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
              <input type="checkbox" name="reponses" id={i} value={answer}/>
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

  const checkAnswers = (e) => {
    e.preventDefault()
    // Récupération des checkbox checked dans un array
    const answers = [...e.target.elements.reponses].map(inpt => inpt.checked && inpt.value).filter((inpt => inpt !== false))
    console.log("Valid answers", q.response.validAnswers)

    // Vérification que les réponses sont valides
    let correct = false
    q.response.validAnswers.forEach((va, i) => {
      if (va == answers[i]) correct = true
      else correct = false
    });

    // Affichage si bonne réponse ou non
    if (correct) console.log("😀")
    else console.log("😭")
  }

  // RENDER
  return <DisplayQuestion />;
};

export default Question;
