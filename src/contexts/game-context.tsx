import type { ReactNode } from "react";
import { useGame } from "@/hooks/useGame";
import { GameContext } from "./use-game-context";
import { useState, useCallback, useEffect } from "react";

export function GameProvider({ children }: { children: ReactNode }) {
  const game = useGame();
  const [isAllCleared, setIsAllCleared] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const setAllClearedWithLog = useCallback((value: boolean) => {
    console.log('Context: setIsAllCleared called with:', value);
    setIsAllCleared(value);
  }, []);

  const setGameOverWithLog = useCallback((value: boolean) => {
    console.log('Context: setGameOver called with:', value);
    setGameOver(value);
  }, []);

  const resetGameWithAllCleared = useCallback(() => {
    console.log('Context: Resetting game, isAllCleared and gameOver');
    game.resetGame();
    setIsAllCleared(false);
    setGameOver(false);
  }, [game]);

  useEffect(() => {
    console.log('GameProvider State Changed:', {
      isPlaying: game.isPlaying,
      isAllCleared,
      gamePointsLength: game.gamePoints.length
    });
  }, [game.isPlaying, isAllCleared, game.gamePoints.length]);

  const contextValue = {
    isPlaying: game.isPlaying,
    time: game.time,
    points: game.points,
    gamePoints: game.gamePoints,
    isAllCleared,
    gameOver,
    setTime: game.setTime,
    setPoints: game.setPoints,
    startGame: game.startGame,
    resetGame: resetGameWithAllCleared,
    stopTimer: game.stopTimer,
    setIsAllCleared: setAllClearedWithLog,
    setGameOver: setGameOverWithLog
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}
