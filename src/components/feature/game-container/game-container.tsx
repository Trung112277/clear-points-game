import { NextCount } from "../next-count/next-count";
import { PointsGame } from "../points/points-game";
import { GAME_CONSTANTS } from "@/constants";
import { useGameContext } from "@/contexts/use-game-context";
import { usePointStates } from "@/hooks/usePointStates";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useAutoPlay } from "@/hooks/useAutoPlay";
import { getZIndex } from "@/utils";

export function GameContainer() {
  const { gamePoints, isPlaying, setGameOver, stopTimer, gameOver, setIsAllCleared } = useGameContext();
  const { 
    pointStates, 
    initializePoints, 
    handlePointClick, 
    updateCountdown, 
    resetPoints,
    isAllCleared
  } = usePointStates(gamePoints, setGameOver);

  useAutoPlay({ pointStates, handlePointClick });

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

  return (
    <div className="flex flex-col gap-4">
      <div 
        className="relative flex flex-col gap-4 bg-gray-50 rounded-lg border border-gray-500 w-full h-full"
        style={{ 
          width: `${GAME_CONSTANTS.CONTAINER_SIZE}px`,
          height: `${GAME_CONSTANTS.CONTAINER_SIZE}px`,
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