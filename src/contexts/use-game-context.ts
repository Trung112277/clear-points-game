import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { GamePoint } from "@/types";

interface GameContextType {
  // Game state
  isPlaying: boolean;
  time: number;
  points: number;
  gamePoints: GamePoint[];
  
  // Game actions
  setTime: Dispatch<SetStateAction<number>>;
  setPoints: Dispatch<SetStateAction<number>>;
  startGame: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}

export { GameContext };
export type { GameContextType };
