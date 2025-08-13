import { NextCount } from "../next-count/next-count";
import { PointsGame } from "../points/points-game";
import { GAME_CONSTANTS } from "@/constants";
import { useGameContext } from "@/contexts/use-game-context";
import { useEffect } from "react";
import { usePointStates } from "@/hooks/usePointStates";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useAutoPlay } from "@/hooks/useAutoPlay";
import { getZIndex } from "@/utils";

export function GameContainer() {
  const { gamePoints, isPlaying, setIsAllCleared, setGameOver, stopTimer, gameOver } = useGameContext();
  const { 
    pointStates, 
    initializePoints, 
    handlePointClick, 
    updateCountdown, 
    resetPoints,
    isAllCleared
  } = usePointStates(gamePoints, setGameOver);

  useAutoPlay({ pointStates, handlePointClick });
  
  console.log('GameContainer render:', {
    pointStatesLength: pointStates.length,
    isPlaying,
    gameOver,
    isAllCleared,
    handlePointClickType: typeof handlePointClick
  });

  useGameLogic({
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
  });

  useEffect(() => {
    console.log('GameContainer State Changed:', {
      isPlaying,
      isAllCleared,
      pointStatesLength: pointStates.length,
      visiblePoints: pointStates.filter(p => p.isVisible).length
    });
  }, [isPlaying, isAllCleared, pointStates.length]);

  return (
    <div className="flex flex-col gap-4">
      <div 
        className="relative flex flex-col gap-4 bg-gray-50 rounded-lg border border-gray-500"
        style={{ 
          width: `${GAME_CONSTANTS.CONTAINER_SIZE}px`, 
          height: `${GAME_CONSTANTS.CONTAINER_SIZE}px` 
        }}
      >
        {(isPlaying || gameOver) && pointStates
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
                gameOver={gameOver}
              />
            </div>
          ))}
      </div>
      <NextCount pointStates={pointStates} gameOver={gameOver} />
    </div>
  );
}