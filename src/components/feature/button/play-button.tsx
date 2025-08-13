import { Button } from "@/components/ui/button";

interface PlayButtonProps {
  onClick: () => void;
}

export function PlayButton({ onClick }: PlayButtonProps) {
  return <Button onClick={onClick}>Play</Button>;
}