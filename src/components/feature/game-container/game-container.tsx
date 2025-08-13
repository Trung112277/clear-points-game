import { NextCount } from "../next-count/next-count";
import { PointsGame } from "../points/points-game";
import { GAME_CONSTANTS } from "@/constants";
import { useGameContext } from "@/contexts/use-game-context";
import { useEffect } from "react";
import { usePointStates } from "@/hooks/usePointStates";
import { getZIndex } from "@/utils";

export function GameContainer() {
  const { gamePoints, isPlaying } = useGameContext();
  const { 
    pointStates, 
    initializePoints, 
    handlePointClick, 
    updateCountdown, 
    resetPoints 
  } = usePointStates(gamePoints);

  useEffect(() => {
    if (gamePoints.length > 0) {
      initializePoints();
    }
  }, [gamePoints, initializePoints]);

  useEffect(() => {
    if (!isPlaying) {
      resetPoints();
    }
  }, [isPlaying, resetPoints]);

  useEffect(() => {
    const interval = setInterval(updateCountdown, GAME_CONSTANTS.COUNTDOWN_INTERVAL);
    return () => clearInterval(interval);
  }, [updateCountdown]);

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