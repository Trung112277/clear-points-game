import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GAME_CONSTANTS, GAME_MESSAGES } from "@/constants";
import { useGameContext } from "@/contexts/use-game-context";
import { useState } from "react";

export function PointsInput() {
  const { points, setPoints, isPlaying } = useGameContext();
  const [showMinMaxMessage, setShowMinMaxMessage] = useState(false);
  const [inputValue, setInputValue] = useState(points.toString());

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying) {
      const value = e.target.value;
      setInputValue(value); 
      
      if (value === '') {
        setShowMinMaxMessage(false);
        return;
      }
      
      const numValue = parseInt(value);
      
      if (numValue > GAME_CONSTANTS.MAX_POINTS) {
        setPoints(GAME_CONSTANTS.MAX_POINTS);
        setInputValue(GAME_CONSTANTS.MAX_POINTS.toString());
        setShowMinMaxMessage(true);
      } else {
        setPoints(numValue);
        setShowMinMaxMessage(false);
      }
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isPlaying) {
      const value = e.target.value;
      if (value === '') {
        setPoints(GAME_CONSTANTS.MIN_POINTS);
        setInputValue(GAME_CONSTANTS.MIN_POINTS.toString());
        setShowMinMaxMessage(false);
      } else {
        const numValue = parseInt(value);
        if (numValue < GAME_CONSTANTS.MIN_POINTS) {
          setPoints(GAME_CONSTANTS.MIN_POINTS);
          setInputValue(GAME_CONSTANTS.MIN_POINTS.toString());
          setShowMinMaxMessage(true);
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 w-[350px]">
      <div className="flex gap-4 items-center">
        <Label className="text-lg font-bold w-[100px]">{GAME_MESSAGES.POINTS}</Label>
        <Input 
          type="number" 
          min={GAME_CONSTANTS.MIN_POINTS}
          max={GAME_CONSTANTS.MAX_POINTS}
          placeholder="Enter points" 
          className="w-[200px]" 
          value={inputValue}
          onChange={handlePointsChange}
          onBlur={handleInputBlur}
          disabled={isPlaying}
        />
      </div>
      {showMinMaxMessage && (
        <div className="text-sm text-red-500 text-center">
          {GAME_MESSAGES.MIN_MAX_POINTS.replace('{min}', GAME_CONSTANTS.MIN_POINTS.toString()).replace('{max}', GAME_CONSTANTS.MAX_POINTS.toString())}
        </div>
      )}
    </div>
  );
}