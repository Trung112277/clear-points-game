import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

interface CountTimeProps {
  isPlaying: boolean;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}

export function CountTime({ isPlaying, time, setTime }: CountTimeProps) {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      if (isPlaying) {
        const id = setInterval(() => {
          setTime((prev) => prev + 0.1); 
        }, 100);
        setIntervalId(id);
      } else {
        if (intervalId) {
          clearInterval(intervalId);
          setIntervalId(null);
        }
      }
    } catch (error) {
      console.error("Timer error:", error);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, setTime]);

  const formatTime = (seconds: number) => {
    return `${seconds.toFixed(1)}s`;
  };

  return (
    <div className="flex gap-4 items-center w-[300px]">
      <span className="text-lg font-bold w-[100px]">Time:</span>
      <time className="text-lg font-bold" dateTime={`00:${time.toFixed(1)}`}>
        {formatTime(time)}
      </time>
    </div>
  );
}
