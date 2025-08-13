import { useState, useCallback, useMemo } from "react";
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
    console.log('Point clicked:', pointNumber);
    setPointStates(prev => 
      prev.map(point => 
        point.number === pointNumber 
          ? { ...point, isClicked: true }
          : point
      )
    );
  }, []);

  const updateCountdown = useCallback(() => {
    setPointStates(prev => {
      const updated = prev.map(point => {
        if (point.isClicked && point.countdown > 0) {
          const newCountdown = point.countdown - GAME_CONSTANTS.COUNTDOWN_DECREMENT;
          if (newCountdown <= 0) {
            console.log('Point', point.number, 'becoming invisible');
            return { ...point, isVisible: false };
          }
          return { ...point, countdown: newCountdown };
        }
        return point;
      });
      
      const visibleCount = updated.filter(p => p.isVisible).length;
      const clickedCount = updated.filter(p => p.isClicked).length;
      console.log('Countdown update:', { visibleCount, clickedCount, total: updated.length });
      
      return updated;
    });
  }, []);

  const isAllCleared = useMemo(() => {
    const hasGamePoints = gamePoints.length > 0;
    const hasPointStates = pointStates.length > 0;
    const allInvisible = pointStates.every(point => !point.isVisible);
    
    console.log('usePointStates isAllCleared calculation:', {
      hasGamePoints,
      hasPointStates,
      allInvisible,
      gamePointsLength: gamePoints.length,
      pointStatesLength: pointStates.length,
      visibleCount: pointStates.filter(p => p.isVisible).length,
      clickedCount: pointStates.filter(p => p.isClicked).length,
      result: hasGamePoints && hasPointStates && allInvisible
    });
    
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
