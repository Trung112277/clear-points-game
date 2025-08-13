export function CountTime() {
  return (
    <div className="flex gap-4 items-center w-[300px]">
      <span className="text-lg font-bold w-[100px]">Time:</span>
      <time className="text-lg font-bold" dateTime="00:00">0.0s</time>
    </div>
  );
}