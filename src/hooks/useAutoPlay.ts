import { useEffect, useRef } from "react";
import { useGameContext } from "@/contexts/use-game-context";

interface UseAutoPlayProps {
  pointStates: Array<{
    number: number;
    isClicked: boolean;
    isVisible: boolean;
  }>;
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

  console.log("🔄 pointStatesRef updated:", {
    oldLength: pointStatesRef.current.length,
    newLength: pointStates.length,
    oldVisible: pointStatesRef.current.filter((p) => p.isVisible).length,
    newVisible: pointStates.filter((p) => p.isVisible).length,
  });

  console.log("🎮 useAutoPlay hook state:", {
    isAutoPlaying,
    isPlaying,
    gameOver,
    isAllCleared,
    pointStatesLength: pointStates.length,
    visiblePoints: pointStates.filter((p) => p.isVisible).length,
    unclickedPoints: pointStates.filter((p) => !p.isClicked && p.isVisible)
      .length,
  });

  useEffect(() => {
    console.log("🔄 useAutoPlay useEffect triggered:", {
      isAutoPlaying,
      isPlaying,
      gameOver,
      isAllCleared,
      pointStatesLength: pointStates.length,
      shouldStartAutoPlay:
        isAutoPlaying && isPlaying && !gameOver && !isAllCleared,
      hasExistingInterval: !!autoPlayIntervalRef.current,
    });

    if (autoPlayIntervalRef.current) {
      console.log(
        "🗑️ Clearing existing interval:",
        autoPlayIntervalRef.current
      );
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }

    if (isAutoPlaying && isPlaying && !gameOver && !isAllCleared) {
      console.log("🚀 Starting auto-play interval...");

      autoPlayIntervalRef.current = setInterval(() => {
        const now = Date.now();
        console.log("🎯 Auto-play interval executing at:", now);

        const currentPointStates = pointStatesRef.current;
        console.log("🔍 Current pointStates from ref:", {
          total: currentPointStates.length,
          visible: currentPointStates.filter((p) => p.isVisible).length,
          unclicked: currentPointStates.filter(
            (p) => !p.isClicked && p.isVisible
          ).length,
          points: currentPointStates.map((p) => ({
            number: p.number,
            isClicked: p.isClicked,
            isVisible: p.isVisible,
          })),
        });

        const availablePoints = currentPointStates.filter(
          (point) => !point.isClicked && point.isVisible
        );
        console.log("📊 Available points to click:", availablePoints.length);

        if (availablePoints.length === 0) {
          console.log("❌ No more points to auto-click, stopping auto-play");
          if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
            autoPlayIntervalRef.current = null;
          }
          return;
        }

        const nextPoint = availablePoints.sort(
          (a, b) => a.number - b.number
        )[0];
        console.log("🎯 Next point to auto-click:", nextPoint);

        if (nextPoint) {
          console.log("🚀 Auto-clicking point:", nextPoint.number);

          try {
            handlePointClickRef.current(nextPoint.number);
            console.log(
              "✅ Auto-click executed successfully for point:",
              nextPoint.number
            );

            setTimeout(() => {
              const updatedPoints = currentPointStates.filter(
                (point) => !point.isClicked && point.isVisible
              );
              console.log(
                "📊 Points after click - Available:",
                updatedPoints.length,
                "Total visible:",
                currentPointStates.filter((p) => p.isVisible).length
              );
            }, 100);
          } catch (error) {
            console.error("❌ Error in auto-click:", error);
          }
        }
      }, 1000);

      console.log(
        "✅ Auto-play interval started with ID:",
        autoPlayIntervalRef.current
      );
    } else {
      console.log("🛑 Auto-play conditions not met, not starting interval");
    }
    return () => {
      if (autoPlayIntervalRef.current) {
        console.log(
          "🧹 Cleanup: Clearing interval:",
          autoPlayIntervalRef.current
        );
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
    };
  }, [isAutoPlaying, isPlaying, gameOver, isAllCleared]);

  useEffect(() => {
    console.log("📊 useAutoPlay: pointStates changed:", {
      length: pointStates.length,
      visible: pointStates.filter((p) => p.isVisible).length,
      unclicked: pointStates.filter((p) => !p.isClicked && p.isVisible).length,
      points: pointStates.map((p) => ({
        number: p.number,
        isClicked: p.isClicked,
        isVisible: p.isVisible,
      })),
    });
  }, [pointStates]);

  return {
    isAutoPlaying,
    canAutoPlay: isPlaying && !gameOver && !isAllCleared,
  };
}
