import { useEffect } from "react";
import { GAME_CONSTANTS } from "@/constants";
import type { GamePoint, PointState } from "@/types";

interface UseGameLogicProps {
  isPlaying: boolean;
  gamePoints: GamePoint[];
  pointStates: PointState[];
  isAllCleared: boolean;
  gameOver: boolean;
  setIsAllCleared: (value: boolean) => void;
  stopTimer: () => void;
  resetPoints: () => void;
  initializePoints: () => void;
  updateCountdown: () => void;
}

export function useGameLogic({
  isPlaying,
  gamePoints,
  pointStates,
  isAllCleared,
  gameOver,
  setIsAllCleared,
  stopTimer,
  resetPoints,
  initializePoints,
  updateCountdown
}: UseGameLogicProps) {
  useEffect(() => {
    if ((isAllCleared || gameOver) && isPlaying) {
      stopTimer();
    }

    if (!isPlaying && gamePoints.length === 0 && !isAllCleared && !gameOver) {
      resetPoints();
    }

    if (gamePoints.length > 0 && isPlaying && !isAllCleared && !gameOver) {
      initializePoints();
    }
  }, [isAllCleared, gameOver, isPlaying, gamePoints.length, stopTimer, resetPoints, initializePoints]);

  useEffect(() => {
    if (isPlaying && pointStates.length > 0 && !gameOver) {
      let lastTime = Date.now();
      let accumulatedTime = 0;
      
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime;
        accumulatedTime += deltaTime;
        
        while (accumulatedTime >= GAME_CONSTANTS.COUNTDOWN_INTERVAL) {
          updateCountdown();
          accumulatedTime -= GAME_CONSTANTS.COUNTDOWN_INTERVAL;
        }
        
        lastTime = currentTime;
      }, 16);
      
      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlaying, pointStates.length, gameOver, updateCountdown]);

  useEffect(() => {
    if (isAllCleared && !gameOver) {
      setIsAllCleared(true);
    }
  }, [isAllCleared, gameOver, setIsAllCleared]);
}
