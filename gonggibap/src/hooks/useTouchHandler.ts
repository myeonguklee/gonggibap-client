import { useState, TouchEvent, useCallback } from 'react';
import { MobilePosition } from '@/types/sidebar';

type TouchState = {
  startY: number;
  currentY: number;
  isDragging: boolean;
};

type UseTouchHandlerProps = {
  onPositionChange: (newPosition: MobilePosition) => void;
  currentPosition: MobilePosition;
  contentRef: React.RefObject<HTMLDivElement>;
};

export const useTouchHandler = ({
  onPositionChange,
  currentPosition,
  contentRef
}: UseTouchHandlerProps) => {
  const [touchState, setTouchState] = useState<TouchState>({
    startY: 0,
    currentY: 0,
    isDragging: false
  });

  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    setTouchState({
      startY: e.touches[0].clientY,
      currentY: e.touches[0].clientY,
      isDragging: true
    });
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (!touchState.isDragging) return;
    
    if (currentPosition !== "full") {
      e.preventDefault();
    }
    
    setTouchState(prev => ({
      ...prev,
      currentY: e.touches[0].clientY
    }));
  }, [touchState.isDragging, currentPosition]);

  const handleTouchEnd = useCallback(() => {
    if (!touchState.isDragging) return;

    const diff = touchState.startY - touchState.currentY;
    const threshold = 30;
    const isScrolledToTop = contentRef.current?.scrollTop === 0;

    if (Math.abs(diff) < threshold) {
      setTouchState(prev => ({ ...prev, isDragging: false }));
      return;
    }

    // 위로 스와이프
    if (diff > 0) {
      if (currentPosition === "peek") onPositionChange("half");
      else if (currentPosition === "half") onPositionChange("full");
    } 
    // 아래로 스와이프
    else {
      if (currentPosition === "full" && isScrolledToTop) {
        onPositionChange("half");
      } else if (currentPosition === "half") {
        onPositionChange("peek");
      }
    }

    setTouchState(prev => ({ ...prev, isDragging: false }));
  }, [touchState, currentPosition, contentRef, onPositionChange]);

  return {
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    },
    isDragging: touchState.isDragging
  };
};