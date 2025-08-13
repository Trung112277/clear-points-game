import { Button } from "@/components/ui/button";

interface RestartButtonProps {
  onClick: () => void;
  isPlaying: boolean;
}

export function RestartButton({ onClick }: RestartButtonProps) {
  return <Button onClick={onClick} >Restart</Button>;
}