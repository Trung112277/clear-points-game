import { useGameContext } from "@/contexts/use-game-context";

export function Heading() {
    const { isPlaying, isAllCleared } = useGameContext();

    if (isPlaying && isAllCleared) {
        return (
            <h1 className="text-2xl font-bold uppercase text-green-600">
                All Cleared!
            </h1>
        );
    }

    return (
        <h1 className="text-2xl font-bold uppercase">
            Let's Play
        </h1>
    );
}