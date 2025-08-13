import { AutoPlayButton } from "../button/auto-play-button";
import { PlayButton } from "../button/play-button";
import { RestartButton } from "../button/restart-button";
import { useGameContext } from "@/contexts/use-game-context";

export function GameControls() {
  const { isPlaying, startGame, resetGame } = useGameContext();

  return (
    <div className="flex gap-4 items-center">
      {!isPlaying ? (
        <PlayButton onClick={startGame} />
      ) : (
        <>
          <AutoPlayButton />
          <RestartButton onClick={resetGame} />
        </>
      )}
    </div>
  );
}