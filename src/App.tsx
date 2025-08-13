import { GameControls } from "./components/feature/button/game-controls"
import { GameContainer } from "./components/feature/game-container/game-container"
import { Heading } from "./components/feature/heading/heading"
import { PointsInput } from "./components/feature/points/points-input"
import { CountTime } from "./components/feature/time/count-time"

function App() {
  return (
    <div className="container mx-auto max-w-[1000px] flex flex-col items-center justify-center gap-4 my-10">
      <Heading />
      <PointsInput />
      <CountTime />
      <GameControls />
      <GameContainer />
    </div>
  )
}

export default App
