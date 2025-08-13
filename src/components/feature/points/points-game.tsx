import { getOpacity, getScale } from "@/utils";
import { GAME_MESSAGES } from "@/constants";

interface PointsGameProps {
  number: number;
  isClicked: boolean;
  countdown: number;
  onClick: () => void;
  gameOver: boolean;
}

export function PointsGame({ number, isClicked, countdown, onClick, gameOver }: PointsGameProps) {
  const backgroundColor = isClicked ? 'bg-red-500' : 'bg-gray-50';
  const textColor = isClicked ? 'text-white' : 'text-black';
  const opacity = getOpacity(isClicked, countdown);
  const scale = getScale(isClicked, countdown);

  const ariaLabel = GAME_MESSAGES.POINT_BUTTON
    .replace('{number}', number.toString())
    + (isClicked ? `, clicked, countdown: ${countdown.toFixed(1)}s` : '');

  return (
    <div 
      className={`border border-red-500 ${backgroundColor} rounded-full w-[50px] h-[50px] flex flex-col items-center justify-center transition-all duration-300 ${
        gameOver 
          ? 'cursor-not-allowed opacity-50' 
          : `cursor-pointer ${isClicked ? '' : 'hover:bg-gray-400'}`
      }`}
      style={gameOver ? {} : { opacity, transform: scale }}
      onClick={gameOver ? undefined : onClick}
      role="button"
      aria-label={ariaLabel}
      tabIndex={gameOver ? -1 : 0}
      onKeyDown={(e) => {
        if (!gameOver && (e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <span className={`text-md font-bold ${textColor}`}>
        {number}
      </span>
      {isClicked && (
        <time 
          dateTime={`00:${countdown.toFixed(1)}`} 
          className={`text-sm ${textColor} font-bold`}
        >
          {countdown.toFixed(1)}s
        </time>
      )}
    </div>
  );
}
