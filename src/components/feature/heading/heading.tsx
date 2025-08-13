import { useGameContext } from "@/contexts/use-game-context";

export function Heading() {
    const { isAllCleared, gameOver } = useGameContext();
    
    return (
        <h1 className={`text-2xl font-bold uppercase ${
            gameOver ? 'text-red-600' : isAllCleared ? 'text-green-600' : ''
        }`}>
            {gameOver ? 'Game Over!' : isAllCleared ? 'All Cleared!' : "Let's Play"}
        </h1>
    );
}