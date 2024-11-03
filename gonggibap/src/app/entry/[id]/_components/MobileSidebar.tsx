import {
  useState,
  TouchEvent as ReactTouchEvent,
  useRef,
  useEffect,
} from 'react';

import { Restaurant } from '@/types/restaurant';
import { MobilePosition } from '@/types/sidebar';

import { ThemeToggleBtn } from '@/app/_components/ThemeToggleBtn';
import { RestaurantDetailView } from '@/app/entry/[id]/_components/RestaurantDetailView';


interface MobileSidebarProps {
  restaurant: Restaurant;
}

export function MobileSidebar({ restaurant }: MobileSidebarProps) {
  const [position, setPosition] = useState<MobilePosition>('peek');
  const [touchState, setTouchState] = useState({
    startY: 0,
    currentY: 0,
    isDragging: false,
  });
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sidebarRef.current;
    if (!element) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchState.isDragging) return;
      if (position !== 'full') {
        e.preventDefault();
      }
    };

    // TouchEvent 타입을 명시적으로 처리
    const touchMoveHandler: EventListener = (e: Event) => {
      if (e instanceof TouchEvent) {
        handleTouchMove(e);
      }
    };

    element.addEventListener('touchmove', touchMoveHandler, { passive: false });

    return () => {
      element.removeEventListener('touchmove', touchMoveHandler);
    };
  }, [touchState.isDragging, position]);

  const handleTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    setTouchState({
      startY: e.touches[0].clientY,
      currentY: e.touches[0].clientY,
      isDragging: true,
    });
  };

  const handleTouchMove = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (!touchState.isDragging) return;
    setTouchState((prev) => ({ ...prev, currentY: e.touches[0].clientY }));
  };

  const handleTouchEnd = () => {
    if (!touchState.isDragging) return;

    const diff = touchState.startY - touchState.currentY;
    const threshold = 30;
    const contentElement = document.querySelector(
      '.mobile-content',
    ) as HTMLElement;
    const isScrolledToTop = contentElement?.scrollTop === 0;

    if (Math.abs(diff) < threshold) {
      setTouchState((prev) => ({ ...prev, isDragging: false }));
      return;
    }

    if (diff > 0) {
      setPosition((prev) => {
        if (prev === 'peek') return 'half';
        if (prev === 'half') return 'full';
        return prev;
      });
    } else {
      if (position === 'full' && isScrolledToTop) {
        setPosition('half');
      } else if (position === 'half') {
        setPosition('peek');
      }
    }

    setTouchState((prev) => ({ ...prev, isDragging: false }));
  };

  const positionToHeightClass = {
    peek: 'h-24',
    half: 'h-1/2',
    full: 'h-[85vh]',
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 z-20
        rounded-t-3xl shadow-lg transform transition-all duration-300 ease-out
        ${positionToHeightClass[position]}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="모바일 메뉴">
      <div className="relative">
        <ThemeToggleBtn position={position} />
      </div>
      <div
        className="w-full h-6 touch-none drag-handle flex-center"
        role="button"
        aria-label="스와이프로 메뉴 조절">
        <div className="w-10 h-1 bg-gray-600 rounded-full" />
      </div>

      <div
        className={`
          overflow-y-auto h-[calc(100%-1.5rem)] p-4 mobile-content
          ${position === 'full' ? 'touch-auto' : 'touch-none'}
        `}>
        <RestaurantDetailView restaurant={restaurant} />
      </div>
    </div>
  );
}
