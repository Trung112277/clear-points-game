import { useState } from "react";
import { AutoPlayButton } from "./auto-play-button";
import { PlayButton } from "./play-button";
import { RestartButton } from "./restart-button";

export function GameControls() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };
  
  const handleRestartClick = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex gap-4 items-center">
      {!isPlaying ? (
        <PlayButton onClick={handlePlayClick} isPlaying={isPlaying} />
      ) : (
        <>
          <AutoPlayButton />
          <RestartButton onClick={handleRestartClick} isPlaying={isPlaying} />
        </>
      )}
    </div>
  );
}
