import { GAME_CONSTANTS } from "@/constants";

export const getOpacity = (isClicked: boolean, countdown: number): number => {
  if (!isClicked) return 1;
  
  if (countdown <= GAME_CONSTANTS.FADE_OUT_DURATION) {
    return countdown / GAME_CONSTANTS.FADE_OUT_DURATION;
  }
  return 1;
};

export const getScale = (isClicked: boolean, countdown: number): string => {
  if (isClicked && countdown <= GAME_CONSTANTS.FADE_OUT_DURATION) {
    return 'scale(0.9)';
  }
  return 'scale(1)';
};

export const getZIndex = (isClicked: boolean): number => {
  return isClicked ? GAME_CONSTANTS.CLICKED_POINT_Z_INDEX : GAME_CONSTANTS.POINT_Z_INDEX;
};
