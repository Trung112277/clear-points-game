import { useGameContext } from "@/contexts/use-game-context";

export function Heading() {
    const { isAllCleared } = useGameContext();
    
    return (
        <h1 className={`text-2xl font-bold uppercase ${
            isAllCleared ? 'text-green-600' : ''
        }`}>
            {isAllCleared ? 'All Cleared!' : "Let's Play"}
        </h1>
    );
}