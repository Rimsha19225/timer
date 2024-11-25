import React, { useState, useEffect, useRef } from 'react';

const Countdown_Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // For storing timer ID

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []); // Empty dependency array to only run once

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const restart = () => {
    stop();
    setSeconds(0);
    setMinutes(0);
  };

  const start = () => {
    if (timerRef.current) clearInterval(timerRef.current); // Avoid multiple intervals
    timerRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000);
  };

  return (
    <div className="timer">
      <div className="container">
        <div className="timer_container">
          <h1 className="heading">Countdown Timer</h1>
          <h2 className="timer_box">
            {minutes < 10 ? '0' + minutes : minutes}:
            {seconds < 10 ? '0' + seconds : seconds}
          </h2>
          <button className="stop" onClick={stop}>
            Pause
          </button>
          <button className="restart" onClick={restart}>
            Restart
          </button>
          <button className="start" onClick={start}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Countdown_Timer;
