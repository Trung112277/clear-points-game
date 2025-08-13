import type { ReactNode } from "react";
import { useGame } from "@/hooks/useGame";
import { GameContext } from "./use-game-context";
import { useState, useCallback, useMemo } from "react";

export function GameProvider({ children }: { children: ReactNode }) {
  const game = useGame();
  const [isAllCleared, setIsAllCleared] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const setAllClearedWithLog = useCallback((value: boolean) => {
    setIsAllCleared(value);
  }, []);

  const setGameOverWithLog = useCallback((value: boolean) => {
    setGameOver(value);
  }, []);

  const resetGameWithAllCleared = useCallback(() => {
    game.resetGame();
    setIsAllCleared(false);
    setGameOver(false);
    setIsAutoPlaying(false);
  }, [game]);

  const contextValue = useMemo(() => ({
    isPlaying: game.isPlaying,
    time: game.time,
    points: game.points,
    gamePoints: game.gamePoints,
    isAllCleared,
    gameOver,
    isAutoPlaying,
    setTime: game.setTime,
    setPoints: game.setPoints,
    startGame: game.startGame,
    resetGame: resetGameWithAllCleared,
    stopTimer: game.stopTimer,
    setIsAllCleared: setAllClearedWithLog,
    setGameOver: setGameOverWithLog,
    setIsAutoPlaying: setIsAutoPlaying
  }), [
    game.isPlaying,
    game.time,
    game.points,
    game.gamePoints,
    isAllCleared,
    gameOver,
    isAutoPlaying,
    game.setTime,
    game.setPoints,
    game.startGame,
    game.stopTimer,
    resetGameWithAllCleared,
    setAllClearedWithLog,
    setGameOverWithLog,
    setIsAutoPlaying
  ]);

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}
