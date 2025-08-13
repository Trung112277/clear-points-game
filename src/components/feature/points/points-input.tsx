import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GAME_CONSTANTS } from "@/constants";
import { useGameContext } from "@/contexts/use-game-context";
import { useState } from "react";

export function PointsInput() {
  const { points, setPoints, isPlaying } = useGameContext();
  const [showMinMaxMessage, setShowMinMaxMessage] = useState(false);

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying) {
      const value = e.target.value;
      
      if (value === '') {
        setPoints(GAME_CONSTANTS.MIN_POINTS);
        setShowMinMaxMessage(false);
        return;
      }
      
      const numValue = parseInt(value);
      
      if (numValue < GAME_CONSTANTS.MIN_POINTS) {
        setPoints(GAME_CONSTANTS.MIN_POINTS);
        setShowMinMaxMessage(true);
      } else if (numValue > GAME_CONSTANTS.MAX_POINTS) {
        setPoints(GAME_CONSTANTS.MAX_POINTS);
        setShowMinMaxMessage(true);
      } else {
        setPoints(numValue);
        setShowMinMaxMessage(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 w-[300px]">
      <div className="flex gap-4 items-center">
        <Label className="text-lg font-bold w-[100px]">Points:</Label>
        <Input 
          type="number" 
          min={GAME_CONSTANTS.MIN_POINTS}
          max={GAME_CONSTANTS.MAX_POINTS}
          placeholder="Enter points" 
          className="w-32" 
          value={points}
          onChange={handlePointsChange}
          disabled={isPlaying}
        />
      </div>
      {showMinMaxMessage && (
        <div className="text-sm text-red-500 text-center">
          Max: {GAME_CONSTANTS.MAX_POINTS}
        </div>
      )}
    </div>
  );
}