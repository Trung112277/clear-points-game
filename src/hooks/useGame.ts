import { useState, useCallback } from "react";
import { GAME_CONSTANTS } from "@/constants";
import type { GamePoint } from "@/types";

export function useGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [points, setPoints] = useState<number>(GAME_CONSTANTS.MIN_POINTS);
  const [gamePoints, setGamePoints] = useState<GamePoint[]>([]);

  const startGame = useCallback(() => {
    setIsPlaying(true);
    generateRandomPoints();
  }, [points]);

  const resetGame = useCallback(() => {
    setIsPlaying(false);
    setTime(0);
    setGamePoints([]);
  }, []);

  const generateRandomPoints = useCallback(() => {
    const maxPosition = GAME_CONSTANTS.CONTAINER_SIZE - GAME_CONSTANTS.POINT_SIZE;
    
    const newPoints = Array.from({ length: points }, (_, i) => ({
      number: i + 1,
      top: Math.random() * maxPosition,
      left: Math.random() * maxPosition
    }));
    
    setGamePoints(newPoints);
  }, [points]);

  return {
    isPlaying,
    time,
    setTime,
    points,
    setPoints,
    gamePoints,
    startGame,
    resetGame
  };
}
