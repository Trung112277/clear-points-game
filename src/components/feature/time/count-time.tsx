import { useState, useEffect } from "react";
import { GAME_CONSTANTS } from "@/constants";
import { useGameContext } from "@/contexts/use-game-context";

export function CountTime() {
  const { isPlaying, time, setTime } = useGameContext();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      if (isPlaying) {
        const id = setInterval(() => {
          setTime((prev: number) => prev + GAME_CONSTANTS.TIMER_INCREMENT);
        }, GAME_CONSTANTS.TIMER_INTERVAL);
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

  const formatDateTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toFixed(1).padStart(4, '0')}`;
  };

  return (
    <div className="flex gap-4 items-center w-[300px]">
      <span className="text-lg font-bold w-[100px]">Time:</span>
      <time className="text-lg font-bold" dateTime={formatDateTime(time)}>
        {formatTime(time)}
      </time>
    </div>
  );
}
