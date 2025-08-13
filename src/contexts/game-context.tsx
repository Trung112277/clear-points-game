import type { ReactNode } from "react";
import { useGame } from "@/hooks/useGame";
import { GameContext } from "./use-game-context";

export function GameProvider({ children }: { children: ReactNode }) {
  const game = useGame();

  const contextValue = {
    isPlaying: game.isPlaying,
    time: game.time,
    points: game.points,
    gamePoints: game.gamePoints,
    setTime: game.setTime,
    setPoints: game.setPoints,
    startGame: game.startGame,
    resetGame: game.resetGame,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}
