import { useGameContext } from "@/contexts/use-game-context";
import { GAME_MESSAGES } from "@/constants";

export function Heading() {
    const { isAllCleared, gameOver } = useGameContext();
    
    return (
        <h1 className={`text-2xl font-bold uppercase ${
            gameOver ? 'text-red-600' : isAllCleared ? 'text-green-600' : ''
        }`}>
            {gameOver ? GAME_MESSAGES.GAME_OVER : isAllCleared ? GAME_MESSAGES.ALL_CLEARED : GAME_MESSAGES.LETS_PLAY}
        </h1>
    );
}