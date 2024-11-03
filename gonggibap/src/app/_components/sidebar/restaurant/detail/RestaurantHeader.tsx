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

  // 글자 길이에 따른 텍스트 크기 클래스 결정
  const getTextSizeClass = (text: string) => {
    if (isMobile) return 'text-2xl';
    if (text.length > 15) return 'text-lg';
    if (text.length >= 12) return 'text-xl';
    return 'text-2xl';
  };

  const textSizeClass = getTextSizeClass(restaurantName);

  return (
    <header className="flex-between-center">
      <div className="flex items-center gap-2">
        <button
          onClick={isMobile ? onBack : onClose}
          className="rounded dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
          aria-label={isMobile ? '뒤로 가기' : '닫기'}>
          <ChevronLeft size="1.5rem" />
        </button>
        <div className="flex items-center gap-2">
          <h1 className={`${textSizeClass} font-black`}>{restaurantName}</h1>
          {restaurantDetailCategory && (
            <p className="text-gray-500 font-bold translate-y-0.5 flex-shrink-0">
              {restaurantDetailCategory}
            </p>
          )}
        </div>
      </div>

      {!isMobile && (
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
