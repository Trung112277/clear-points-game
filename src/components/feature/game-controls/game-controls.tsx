import { AutoPlayButton } from "../button/auto-play-button";
import { PlayButton } from "../button/play-button";
import { RestartButton } from "../button/restart-button";

interface GameControlsProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  resetTime: () => void;
}

export function GameControls({ isPlaying, setIsPlaying, resetTime }: GameControlsProps) {
  const handlePlayClick = () => {
    setIsPlaying(true);
  };
  
  const handleRestartClick = () => {
    setIsPlaying(false);
    resetTime();
  };

  return (
    <div className="flex gap-4 items-center">
      {!isPlaying ? (
        <PlayButton onClick={handlePlayClick} />
      ) : (
        <>
          <AutoPlayButton />
          <RestartButton onClick={handleRestartClick} />
        </>
      )}
    </div>
  );
}