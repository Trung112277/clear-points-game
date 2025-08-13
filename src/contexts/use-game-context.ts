import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { GamePoint } from "@/types";
import { ERROR_MESSAGES } from "@/constants";

interface GameContextType {
  // Game state
  isPlaying: boolean;
  time: number;
  points: number;
  gamePoints: GamePoint[];
  isAllCleared: boolean;
  gameOver: boolean;
  isAutoPlaying: boolean;
  
  // Game actions
  setTime: Dispatch<SetStateAction<number>>;
  setPoints: Dispatch<SetStateAction<number>>;
  startGame: () => void;
  resetGame: () => void;
  stopTimer: () => void;
  setIsAllCleared: (cleared: boolean) => void;
  setGameOver: (gameOver: boolean) => void;
  setIsAutoPlaying: (autoPlaying: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error(ERROR_MESSAGES.CONTEXT_MUST_BE_USED_WITHIN_PROVIDER);
  }
  return context;
}

export { GameContext };
export type { GameContextType };
