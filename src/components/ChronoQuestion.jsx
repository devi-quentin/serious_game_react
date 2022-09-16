import { useEffect, useState } from "react";

const ChronoQuestion = ({initialTimer}) => {
  const [timer, setTimer] = useState(initialTimer * 10);
  useEffect(() => {
    const chrono = setInterval(() => {
      setTimer((n) => n - 1);
    }, 100);

    if (timer <= 0) {
      clearInterval(chrono)
    }
    
    return () => clearInterval(chrono);
  });

  return <><span className="material-symbols-rounded">timer</span> {timer / 10} sec</>;
};

export default ChronoQuestion;
