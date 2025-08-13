import { useState, useEffect } from "react";
import { GAME_CONSTANTS, GAME_MESSAGES } from "@/constants";
import { useGameContext } from "@/contexts/use-game-context";

export function CountTime() {
  const { isPlaying, time, setTime } = useGameContext();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(() => {
        setTime((prev: number) => prev + GAME_CONSTANTS.TIMER_INCREMENT);
      }, GAME_CONSTANTS.TIMER_INTERVAL);
      setIntervalId(id);
      
      return () => {
        clearInterval(id);
      };
    }
  }, [isPlaying, setTime]);

  useEffect(() => {
    if (!isPlaying && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isPlaying, intervalId]);

  const formatTime = (seconds: number) => {
    return `${seconds.toFixed(1)}s`;
  };

  const formatDateTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toFixed(1).padStart(4, '0')}`;
  };

  return (
    <div className="flex gap-4 items-center w-[350px]">
      <span className="text-lg font-bold w-[100px]">{GAME_MESSAGES.TIME}</span>
      <time className="text-lg font-bold" dateTime={formatDateTime(time)}>
        {formatTime(time)}
      </time>
    </div>
  );
}
