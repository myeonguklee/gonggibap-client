import { useMemo } from 'react';
import { MobilePosition } from '@/types/sidebar';

type AnimationConfig = {
  height: string;
  transform: string;
  transition: string;
};

export const useAnimatedPosition = (
  position: MobilePosition,
  isDragging: boolean
) => {
  const baseTransition = 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)';
  
  return useMemo(() => {
    const config: AnimationConfig = {
      height: 'h-24',
      transform: 'transform-none',
      transition: isDragging ? 'none' : baseTransition
    };

    switch (position) {
      case 'peek':
        config.height = 'h-24';
        break;
      case 'half':
        config.height = 'h-1/2';
        break;
      case 'full':
        config.height = 'h-[85vh]';
        break;
    }

    return config;
  }, [position, isDragging]);
};