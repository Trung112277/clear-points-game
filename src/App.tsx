import { useState } from "react";
import { GameControls } from "./components/feature/game-controls/game-controls"
import { GameContainer } from "./components/feature/game-container/game-container"
import { Heading } from "./components/feature/heading/heading"
import { PointsInput } from "./components/feature/points/points-input"
import { CountTime } from "./components/feature/time/count-time"

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  const resetTime = () => {
    setTime(0);
  };

  return (
    <div className="container mx-auto max-w-[1000px] flex flex-col items-center justify-center gap-4 my-10">
      <Heading />
      <PointsInput />
      <CountTime isPlaying={isPlaying} time={time} setTime={setTime} />
      <GameControls isPlaying={isPlaying} setIsPlaying={setIsPlaying} resetTime={resetTime} />
      <GameContainer />
    </div>
  )
}

export default App
