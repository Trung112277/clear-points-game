import { useEffect } from "react";
import { GAME_CONSTANTS } from "@/constants";
import type { GamePoint } from "@/types";

interface PointState {
  number: number;
  top: number;
  left: number;
  isClicked: boolean;
  countdown: number;
  isVisible: boolean;
}

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
    setIsAllCleared(isAllCleared);
  }, [isAllCleared, setIsAllCleared]);

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
      const interval = setInterval(updateCountdown, GAME_CONSTANTS.COUNTDOWN_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [isPlaying, pointStates.length, gameOver, updateCountdown]);
}
