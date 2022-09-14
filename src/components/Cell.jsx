import { useEffect, useState, useRef } from "react";

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

  const myRef = useRef();
  // const [offsetPos, setOffsetPos] = [myRef.current.offsetLeft, myRef.current.offsetTop]
  // console.log(offsetPos)

  // RENDER
  return (
    <div className={themeClass + " cell"} id={"cell_"+question.number} ref={myRef}>
      <div className="cell_number">{question.number}</div>
      {question.challenge ? <p>?</p> : ""}
    </div>
  );
};

export default Cell;
