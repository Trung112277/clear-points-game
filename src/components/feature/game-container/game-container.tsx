import { NextCount } from "../next-count/next-count";
import { PointsGame } from "../points/points-game";
import { GAME_CONSTANTS } from "@/constants";
import { useGameContext } from "@/contexts/use-game-context";
import { useEffect } from "react";
import { usePointStates } from "@/hooks/usePointStates";
import { getZIndex } from "@/utils";

export function GameContainer() {
  const { gamePoints, isPlaying, setIsAllCleared, stopTimer } = useGameContext();
  const { 
    pointStates, 
    initializePoints, 
    handlePointClick, 
    updateCountdown, 
    resetPoints,
    isAllCleared
  } = usePointStates(gamePoints);

  useEffect(() => {
    console.log('GameContainer State Changed:', {
      isPlaying,
      isAllCleared,
      pointStatesLength: pointStates.length,
      visiblePoints: pointStates.filter(p => p.isVisible).length
    });
  }, [isPlaying, isAllCleared, pointStates.length]);

  useEffect(() => {
    console.log('GameContainer: Updating context isAllCleared:', isAllCleared);
    setIsAllCleared(isAllCleared);
  }, [isAllCleared, setIsAllCleared]);

  useEffect(() => {
    if (isAllCleared && isPlaying) {
      console.log('GameContainer: Stopping timer because all points cleared');
      stopTimer();
    }
  }, [isAllCleared, isPlaying, stopTimer]);

  useEffect(() => {
    if (!isPlaying && gamePoints.length === 0) {
      console.log('GameContainer: Game reset, clearing points');
      resetPoints();
    }
  }, [isPlaying, gamePoints.length, resetPoints]);

  useEffect(() => {
    if (gamePoints.length > 0 && isPlaying) {
      initializePoints();
    }
  }, [gamePoints, isPlaying, initializePoints]);

  useEffect(() => {
    if (isPlaying && pointStates.length > 0) {
      const interval = setInterval(updateCountdown, GAME_CONSTANTS.COUNTDOWN_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [isPlaying, pointStates.length, updateCountdown]);

  return (
    <div className="flex flex-col gap-4">
      <div 
        className="relative flex flex-col gap-4 bg-gray-50 rounded-lg border border-gray-500"
        style={{ 
          width: `${GAME_CONSTANTS.CONTAINER_SIZE}px`, 
          height: `${GAME_CONSTANTS.CONTAINER_SIZE}px` 
        }}
      >
        {isPlaying && pointStates
          .filter(point => point.isVisible)
          .map((point) => (
            <div
              key={point.number}
              className="absolute"
              style={{ 
                top: `${point.top}px`, 
                left: `${point.left}px`,
                zIndex: getZIndex(point.isClicked)
              }}
            >
              <PointsGame 
                number={point.number}
                isClicked={point.isClicked}
                countdown={point.countdown}
                onClick={() => handlePointClick(point.number)}
              />
            </div>
          ))}
      </div>
      <NextCount />
    </div>
  );
}