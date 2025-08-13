import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GAME_CONSTANTS } from "@/constants";
import { useGameContext } from "@/contexts/use-game-context";

export function PointsInput() {
  const { points, setPoints, isPlaying } = useGameContext();

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying) {
      const value = parseInt(e.target.value) || 0;
      setPoints(value);
    }
  };

  return (
    <div className="flex gap-4 items-center w-[300px]">
      <Label className="text-lg font-bold w-[100px]">Points:</Label>
      <Input 
        type="number" 
        min={GAME_CONSTANTS.MIN_POINTS}
        placeholder="Enter points" 
        className="w-50" 
        value={points}
        onChange={handlePointsChange}
        disabled={isPlaying}
      />
    </div>
  );
}