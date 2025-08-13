import { AutoPlayButton } from "../button/auto-play-button";
import { PlayButton } from "../button/play-button";
import { RestartButton } from "../button/restart-button";
import { useGameContext } from "@/contexts/use-game-context";

export function GameControls() {
  const { isPlaying, startGame, resetGame, isAllCleared, gameOver } = useGameContext();

  console.log('GameControls Render:', { 
    isPlaying, 
    isAllCleared,
    gameOver,
    shouldShowRestartOnly: isAllCleared || gameOver,
    shouldShowPlayButton: !isPlaying && !isAllCleared && !gameOver,
    shouldShowGameButtons: isPlaying && !isAllCleared && !gameOver,
    renderTime: new Date().toISOString()
  });

  if (gameOver || isAllCleared) {
    console.log(`GameControls: Showing only RestartButton because ${gameOver ? 'game over' : 'all points cleared'}`);
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
  }

  console.log('GameControls: Showing AutoPlay + Restart buttons');
  return (
    <div className="flex gap-4 items-center">
      <AutoPlayButton />
      <RestartButton onClick={resetGame} />
    </div>
  );
}