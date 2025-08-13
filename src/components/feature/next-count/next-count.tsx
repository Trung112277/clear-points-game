import { GAME_MESSAGES } from "@/constants";

interface NextCountProps {
  pointStates: Array<{
    number: number;
    isClicked: boolean;
    isVisible: boolean;
  }>;
  gameOver: boolean;
}

export function NextCount({ pointStates, gameOver }: NextCountProps) {
  const nextNumber = pointStates
  .filter(point => !point.isClicked && point.isVisible)
  .sort((a, b) => a.number - b.number)[0]?.number;

  if (gameOver) {
    return (
      <div className="text-center">
        <span className="text-lg font-bold text-red-600">
          {GAME_MESSAGES.WRONG_CLICK}
        </span>
      </div>
    );
  }

  if (!nextNumber) {
    return (
      <div className="text-center">
        <span className={`text-lg font-bold ${
          pointStates.length > 0 ? "text-green-600" : "text-black"
        }`}>
          {pointStates.length > 0 ? GAME_MESSAGES.ALL_DONE : GAME_MESSAGES.READY_TO_START}
        </span>
      </div>
    );
  }

  return (
    <div className="text-center">
      <span className="text-lg font-bold">{GAME_MESSAGES.NEXT} {nextNumber}</span>
    </div>
  );
}