import { NextCount } from "../next-count/next-count";
import { PointsGame } from "../points/points-game";
import { GAME_CONSTANTS } from "@/constants";
import { useGameContext } from "@/contexts/use-game-context";

export function GameContainer() {
  const { gamePoints, isPlaying } = useGameContext();

  return (
    <div className="flex flex-col gap-4">
      <div 
        className="relative flex flex-col gap-4 bg-gray-50 rounded-lg border border-gray-500"
        style={{ 
          width: `${GAME_CONSTANTS.CONTAINER_SIZE}px`, 
          height: `${GAME_CONSTANTS.CONTAINER_SIZE}px` 
        }}
      >
        {isPlaying && gamePoints.map((point) => (
          <div
            key={point.number}
            className="absolute"
            style={{ top: `${point.top}px`, left: `${point.left}px` }}
          >
            <PointsGame number={point.number} />
          </div>
        ))}
      </div>
      <NextCount />
    </div>
  );
}