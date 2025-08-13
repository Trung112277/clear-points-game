import { GameControls } from "./components/feature/game-controls/game-controls";
import { GameContainer } from "./components/feature/game-container/game-container";
import { Heading } from "./components/feature/heading/heading";
import { PointsInput } from "./components/feature/points/points-input";
import { CountTime } from "./components/feature/time/count-time";
import { GameProvider } from "./contexts/game-context";

function App() {
  return (
    <GameProvider>
      <div className="container mx-auto max-w-[1000px] flex flex-col items-center justify-center gap-4 my-10">
        <Heading />
        <PointsInput />
        <CountTime />
        <GameControls />
        <GameContainer />
      </div>
    </GameProvider>
  );
}

export default App;
