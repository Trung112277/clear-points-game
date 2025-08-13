import { useState, useCallback, useMemo, useEffect } from "react";
import { GAME_CONSTANTS } from "@/constants";
import type { GamePoint, PointState } from "@/types";

export function usePointStates(
  gamePoints: GamePoint[], 
  setGameOver?: (gameOver: boolean) => void
) {
  const [pointStates, setPointStates] = useState<PointState[]>([]);
  const [hasWrongClick, setHasWrongClick] = useState(false);

  const initializePoints = useCallback(() => {
    if (gamePoints.length > 0) {
      const initialStates = gamePoints.map(point => ({
        ...point,
        isClicked: false,
        countdown: GAME_CONSTANTS.POINT_COUNTDOWN,
        isVisible: true
      }));
      setPointStates(initialStates);
      setHasWrongClick(false);
    }
  }, [gamePoints]);

  const resetPoints = useCallback(() => {
    setPointStates([]);
    setHasWrongClick(false);
  }, []);

  const handlePointClick = useCallback((pointNumber: number) => {
    setPointStates(prev => {
      const clickedPoint = prev.find(point => point.number === pointNumber);
      if (!clickedPoint || !clickedPoint.isVisible || clickedPoint.isClicked) {
        return prev;
      }
      
      const nextExpectedNumber = prev
        .filter(point => !point.isClicked && point.isVisible)
        .sort((a, b) => a.number - b.number)[0]?.number;
      
      if (nextExpectedNumber !== pointNumber) {
        setHasWrongClick(true);
        return prev;
      }
      
      return prev.map(point => 
        point.number === pointNumber 
          ? { ...point, isClicked: true }
          : point
      );
    });
  }, []);

  useEffect(() => {
    if (hasWrongClick && setGameOver) {
      setGameOver(true);
    }
  }, [hasWrongClick, setGameOver]);

  const updateCountdown = useCallback(() => {
    setPointStates(prev => {
      const updated = prev.map(point => {
        if (point.isClicked && point.countdown > 0) {
          const newCountdown = point.countdown - GAME_CONSTANTS.COUNTDOWN_DECREMENT;
          if (newCountdown <= 0) {
            return { ...point, isVisible: false };
          }
          return { ...point, countdown: newCountdown };
        }
        return point;
      });
      
      return updated;
    });
  }, []);

  const isAllCleared = useMemo(() => {
    const hasGamePoints = gamePoints.length > 0;
    const hasPointStates = pointStates.length > 0;
    const allInvisible = pointStates.every(point => !point.isVisible);
    
    return hasGamePoints && hasPointStates && allInvisible;
  }, [gamePoints, pointStates]);

  return {
    pointStates,
    initializePoints,
    resetPoints,
    handlePointClick,
    updateCountdown,
    isAllCleared
  };
}
