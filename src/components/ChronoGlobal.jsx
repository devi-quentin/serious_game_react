import { useEffect, useState } from "react";

const ChronoGlobal = () => {
  const [timer, setTimer] = useState(55);
  useEffect(() => {
    const chrono = setInterval(() => {
      setTimer((n) => n - 1);
    }, 60000);

    if (timer <= 0) {
      clearInterval(chrono);
    }

    return () => clearInterval(chrono);
  });

  return (
    <>
      <span className="material-symbols-rounded">timer</span> {timer} min
    </>
  );
};

export default ChronoGlobal;
