import { Button } from "@/components/ui/button";

interface RestartButtonProps {
  onClick: () => void;
}

export function RestartButton({ onClick }: RestartButtonProps) {
  return <Button onClick={onClick}>Restart</Button>;
}