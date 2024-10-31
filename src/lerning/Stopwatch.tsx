import { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current!);
      }, 10);
    }
    return () => {
      clearInterval(intervalIdRef.current!);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
      startTimeRef.current = Date.now() - elapsedTime;
    }
  };

  const formatTime = () => {
    // Calculate minutes, seconds, and milliseconds
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    // Pad with zeroes
    const minutesStr = String(minutes).padStart(2, "0");
    const secondsStr = String(seconds).padStart(2, "0");
    const millisecondsStr = String(milliseconds).padStart(2, "0");

    return `${minutesStr}:${secondsStr}:${millisecondsStr}`;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-200">
      <div className="rounded-md border-4 border-black p-16">
        <div className="text-5xl">{formatTime()}</div>
        <div className="mt-8">
          <button
            className="ml-4 mr-4 w-20 rounded bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-600"
            onClick={handleStartStop}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button
            className="ml-4 mr-4 w-20 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-400"
            onClick={() => {
              setElapsedTime(0);
              setIsRunning(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
