import { NextCount } from "../next-count/next-count";
import { PointsGame } from "../points/points-game";

export function GameContainer() {
  return <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-4 bg-gray-50 rounded-lg border border-gray-500 w-[500px] h-[500px]">
        <PointsGame />
    </div>
    <NextCount />
  </div>
}