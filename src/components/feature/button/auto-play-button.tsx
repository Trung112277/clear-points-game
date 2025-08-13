import { Button } from "@/components/ui/button";
import { useGameContext } from "@/contexts/use-game-context";
import { GAME_MESSAGES } from "@/constants";

export function AutoPlayButton() {
  const { isAutoPlaying, setIsAutoPlaying, isPlaying, gameOver, isAllCleared } = useGameContext();

  const handleToggleAutoPlay = () => {
    if (isPlaying && !gameOver && !isAllCleared) {
      setIsAutoPlaying(!isAutoPlaying);
    }
  };

  const canAutoPlay = isPlaying && !gameOver && !isAllCleared;
  const buttonText = isAutoPlaying ? GAME_MESSAGES.AUTO_PLAY_OFF : GAME_MESSAGES.AUTO_PLAY_ON;
  const buttonVariant = isAutoPlaying ? "destructive" : "default";

  return (
    <Button 
      className="w-[150px]" 
      onClick={handleToggleAutoPlay}
      disabled={!canAutoPlay}
      variant={buttonVariant}
    >
      {buttonText}
    </Button>
  );
}