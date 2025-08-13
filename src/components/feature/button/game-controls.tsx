import { AutoPlayButton } from "./auto-play-button";
import { PlayButton } from "./play-button";
import { RestartButton } from "./restart-button";

export function GameControls() {
  return (
    <div className="flex gap-4 items-center">
      <PlayButton />
      <AutoPlayButton />
      <RestartButton />
    </div>
  );
}
