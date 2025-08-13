import type { FC } from "react";
import { AutoPlayButton } from "../button/auto-play-button";
import { PlayButton } from "../button/play-button";
import { RestartButton } from "../button/restart-button";
import { useGameContext } from "@/contexts/use-game-context";

export const GameControls: FC = () => {
  const { isPlaying, startGame, resetGame, isAllCleared, gameOver } = useGameContext();

  if (gameOver || isAllCleared) {
    return (
      <div className="flex gap-4 items-center">
        <RestartButton onClick={resetGame} />
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="flex gap-4 items-center">
        <PlayButton onClick={startGame} />
      </div>
    );
  }
  return (
    <div className="flex gap-4 items-center">
      <AutoPlayButton />
      <RestartButton onClick={resetGame} />
    </div>
  );
}