import { getOpacity, getScale } from "@/utils";

interface PointsGameProps {
  number: number;
  isClicked: boolean;
  countdown: number;
  onClick: () => void;
}

export function PointsGame({ number, isClicked, countdown, onClick }: PointsGameProps) {
  const backgroundColor = isClicked ? 'bg-red-500' : 'bg-gray-50';
  const textColor = isClicked ? 'text-white' : 'text-black';
  const opacity = getOpacity(isClicked, countdown);
  const scale = getScale(isClicked, countdown);

  return (
    <div 
      className={`border border-red-500 ${backgroundColor} rounded-full w-[50px] h-[50px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-400 transition-all duration-300`}
      style={{ opacity, transform: scale }}
      onClick={onClick}
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
