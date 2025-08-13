export const GAME_MESSAGES = {
  // Game states
  LETS_PLAY: "Let's Play",
  GAME_OVER: "Game Over!",
  ALL_CLEARED: "All Cleared!",
  ALL_DONE: "All Done!",
  READY_TO_START: "Ready to start",
  WRONG_CLICK: "Wrong click!",
  NEXT: "Next:",
  
  // Button texts
  PLAY: "Play",
  RESTART: "Restart",
  AUTO_PLAY_ON: "Auto Play ON",
  AUTO_PLAY_OFF: "Auto Play OFF",
  
  // Labels
  POINTS: "Points:",
  TIME: "Time:",
  
  // Error messages
  TIMER_ERROR: "Timer error:",
  POINT_BECOMING_INVISIBLE: "Point becoming invisible",
  
  // Validation messages
  MIN_MAX_POINTS: "Min: {min} | Max: {max}",
  
  // Accessibility
  POINT_BUTTON: "Point {number}",
  TIMER_DISPLAY: "Timer display",
  POINTS_INPUT: "Points input field",
  GAME_CONTAINER: "Game container",
  NEXT_COUNT_DISPLAY: "Next count display"
} as const;

export const ERROR_MESSAGES = {
  CONTEXT_MUST_BE_USED_WITHIN_PROVIDER: "useGameContext must be used within a GameProvider",
  UNEXPECTED_ERROR: "Something unexpected happened",
  TRY_AGAIN: "Try again",
  SOMETHING_WENT_WRONG: "Something went wrong"
} as const;
