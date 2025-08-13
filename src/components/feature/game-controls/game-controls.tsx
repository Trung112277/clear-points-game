import { AutoPlayButton } from "../button/auto-play-button";
import { PlayButton } from "../button/play-button";
import { RestartButton } from "../button/restart-button";
import { useGameContext } from "@/contexts/use-game-context";

export function GameControls() {
  const { isPlaying, startGame, resetGame, isAllCleared } = useGameContext();

  console.log('GameControls Render:', { 
    isPlaying, 
    isAllCleared,
    shouldShowRestartOnly: isAllCleared,
    shouldShowPlayButton: !isPlaying && !isAllCleared,
    shouldShowGameButtons: isPlaying && !isAllCleared,
    renderTime: new Date().toISOString()
  });

  if (isAllCleared) {
    console.log('GameControls: Showing only RestartButton because all points cleared');
    return (
      <div className="flex gap-4 items-center">
        <RestartButton onClick={resetGame} />
      </div>
    );
  }

  if (!isPlaying) {
    console.log('GameControls: Showing PlayButton');
    return (
      <div className="flex gap-4 items-center">
        <PlayButton onClick={startGame} />
      </div>
    );
  } else {
    console.log('GameControls: Showing AutoPlay + Restart buttons');
    return (
      <div className="flex gap-4 items-center">
        <AutoPlayButton />
        <RestartButton onClick={resetGame} />
      </div>
    );
  }
}