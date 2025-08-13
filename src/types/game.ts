export interface GamePoint {
  number: number;
  top: number;
  left: number;
}

export interface GameState {
  isPlaying: boolean;
  time: number;
  points: number;
  gamePoints: GamePoint[];
}

export interface PointState {
  number: number;
  top: number;
  left: number;
  isClicked: boolean;
  countdown: number;
  isVisible: boolean;
}
