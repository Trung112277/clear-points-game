interface PointsGameProps {
  number?: number;
}

export function PointsGame({ number = 1 }: PointsGameProps) {
  return (
    <div className="border border-red-500 bg-gray-50 rounded-full w-[50px] h-[50px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-400 transition-colors">
      <span className="text-md font-bold text-black">{number}</span>
      <time dateTime="00:00" className="text-sm text-black">0.0s</time>
    </div>
  );
}
