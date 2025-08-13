import { Button } from "@/components/ui/button";
import { GAME_MESSAGES } from "@/constants";

interface RestartButtonProps {
  onClick: () => void;
}

export function RestartButton({ onClick }: RestartButtonProps) {
  return <Button onClick={onClick}>{GAME_MESSAGES.RESTART}</Button>;
}