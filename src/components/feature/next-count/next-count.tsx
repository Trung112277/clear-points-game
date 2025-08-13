interface NextCountProps {
  pointStates: Array<{
    number: number;
    isClicked: boolean;
    isVisible: boolean;
  }>;
}

export function NextCount({ pointStates }: NextCountProps) {
  const nextNumber = pointStates
    .filter(point => !point.isClicked && point.isVisible)
    .sort((a, b) => a.number - b.number)[0]?.number;

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