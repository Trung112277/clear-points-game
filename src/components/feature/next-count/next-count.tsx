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
          Wrong click!
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
          {pointStates.length > 0 ? "All Done!" : "Ready to start"}
        </span>
      </div>
    );
  }

  return (
    <div className="text-center">
      <span className="text-lg font-bold">Next: {nextNumber}</span>
    </div>
  );
}