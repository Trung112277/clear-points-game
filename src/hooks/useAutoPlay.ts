import { useEffect, useRef } from "react";
import { useGameContext } from "@/contexts/use-game-context";

import type { PointState } from "@/types";
import { logger } from "@/utils/logger";

interface UseAutoPlayProps {
  pointStates: PointState[];
  handlePointClick: (pointNumber: number) => void;
}

export function useAutoPlay({
  pointStates,
  handlePointClick,
}: UseAutoPlayProps) {
  const { isAutoPlaying, isPlaying, gameOver, isAllCleared } = useGameContext();
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const handlePointClickRef = useRef(handlePointClick);
  const pointStatesRef = useRef(pointStates);

  handlePointClickRef.current = handlePointClick;
  pointStatesRef.current = pointStates;

  useEffect(() => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }

    if (isAutoPlaying && isPlaying && !gameOver && !isAllCleared) {
      autoPlayIntervalRef.current = setInterval(() => {
        const currentPointStates = pointStatesRef.current;
        const availablePoints = currentPointStates.filter(
          (point) => !point.isClicked && point.isVisible
        );

        if (availablePoints.length === 0) {
          if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
            autoPlayIntervalRef.current = null;
          }
          return;
        }

        const nextPoint = availablePoints.sort(
          (a, b) => a.number - b.number
        )[0];

        if (nextPoint) {
          try {
            handlePointClickRef.current(nextPoint.number);
          } catch (error) {
            logger.error('Auto-play error:', {
              error: error,
              pointNumber: nextPoint.number
            });
          }
        }
      }, 1000);
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
    };
  }, [isAutoPlaying, isPlaying, gameOver, isAllCleared]);

  return {
    isAutoPlaying,
    canAutoPlay: isPlaying && !gameOver && !isAllCleared,
  };
}
