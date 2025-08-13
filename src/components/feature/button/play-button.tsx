import { Button } from "@/components/ui/button";
import { GAME_MESSAGES } from "@/constants";

interface PlayButtonProps {
  onClick: () => void;
}

export function PlayButton({ onClick }: PlayButtonProps) {
  return <Button onClick={onClick}>{GAME_MESSAGES.PLAY}</Button>;
}