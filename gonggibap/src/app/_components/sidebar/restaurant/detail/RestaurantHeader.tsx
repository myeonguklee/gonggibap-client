import { ChevronLeft, X } from 'lucide-react';

import { useMediaQuery } from '@/hooks/useMediaQuery';

type RestaurantHeaderProps = {
  restaurantName: string;
  restaurantDetailCategory: string | null;
  onClose?: () => void;
  onBack?: () => void;
};

export const RestaurantHeader = ({
  restaurantName,
  restaurantDetailCategory,
  onClose,
  onBack,
}: RestaurantHeaderProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const getTextSizeClass = (text: string) => {
    if (isMobile) return 'text-2xl';
    if (text.length > 15) return 'text-lg';
    if (text.length >= 12) return 'text-xl';
    return 'text-2xl';
  };

  const textSizeClass = getTextSizeClass(restaurantName);

  const shouldShowBackButton = isMobile && onBack;
  const shouldShowCloseButton = !isMobile && onClose;
  const shouldShowMobileCloseButton = isMobile && onClose && !onBack;

  return (
    <header className="flex-between-center">
      <div className="flex items-center gap-2">
        {(shouldShowBackButton ||
          shouldShowMobileCloseButton ||
          shouldShowCloseButton) && (
          <button
            onClick={isMobile ? onBack || onClose : onClose}
            className="rounded hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
            aria-label={isMobile ? (onBack ? '뒤로 가기' : '닫기') : '닫기'}>
            <ChevronLeft size="1.5rem" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <h1 className={`${textSizeClass} font-black`}>{restaurantName}</h1>
          {restaurantDetailCategory && (
            <p className="shrink-0 translate-y-0.5 font-bold text-gray-500">
              {restaurantDetailCategory}
            </p>
          )}
        </div>
      </div>

      {shouldShowCloseButton && (
        <button
          onClick={onClose}
          className="hover:bg-gray-100 dark:hover:bg-gray-600"
          aria-label="닫기">
          <X size="1.5rem" />
        </button>
      )}
    </header>
  );
};

export default RestaurantHeader;
