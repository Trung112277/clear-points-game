import { useState, useCallback } from "react";
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

export function usePointStates(gamePoints: GamePoint[]) {
  const [pointStates, setPointStates] = useState<PointState[]>([]);

  const initializePoints = useCallback(() => {
    if (gamePoints.length > 0) {
      const initialStates = gamePoints.map(point => ({
        ...point,
        isClicked: false,
        countdown: GAME_CONSTANTS.POINT_COUNTDOWN,
        isVisible: true
      }));
      setPointStates(initialStates);
    }
  }, [gamePoints]);

  const resetPoints = useCallback(() => {
    setPointStates([]);
  }, []);

  const handlePointClick = useCallback((pointNumber: number) => {
    setPointStates(prev => 
      prev.map(point => 
        point.number === pointNumber 
          ? { ...point, isClicked: true }
          : point
      )
    );
  }, []);

  const updateCountdown = useCallback(() => {
    setPointStates(prev => 
      prev.map(point => {
        if (point.isClicked && point.countdown > 0) {
          const newCountdown = point.countdown - GAME_CONSTANTS.COUNTDOWN_DECREMENT;
          if (newCountdown <= 0) {
            return { ...point, isVisible: false };
          }
          return { ...point, countdown: newCountdown };
        }
        return point;
      })
    );
  }, []);

  return {
    pointStates,
    initializePoints,
    resetPoints,
    handlePointClick,
    updateCountdown
  };
}
