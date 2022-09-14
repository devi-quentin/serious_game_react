import { useEffect, useState } from "react";

const Cell = ({ question }) => {
  // INIT
  let [themeClass, setThemeClass] = useState("");

  // REACTION
  const setColor = (theme) => {
    switch (theme) {
      case "Théorie":
        setThemeClass("theorie");
        break;

      case "Domestique":
        setThemeClass("domestique");
        break;

      case "Économique":
        setThemeClass("economique");
        break;

      case "Publique / politique":
        setThemeClass("publique");
        break;

      default:
        setThemeClass("null");
        break;
    }
  };

  useEffect(() => {
    setColor(question.theme);
  });

  // RENDER
  return (
    <div className={themeClass + " cell"}>
      <div className="cell_number">{question.number}</div>
      {question.challenge ? <p>?</p> : ""}
    </div>
  );
};

export default Cell;
