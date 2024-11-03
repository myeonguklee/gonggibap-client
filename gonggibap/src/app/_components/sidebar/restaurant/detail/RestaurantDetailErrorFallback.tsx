import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { FallbackProps } from 'react-error-boundary';
import { RiRestaurantLine } from 'react-icons/ri';

interface RestaurantDetailErrorFallbackProps extends FallbackProps {
  onClose?: () => void;
}

export const RestaurantDetailErrorFallback = ({
  resetErrorBoundary,
  onClose,
}: RestaurantDetailErrorFallbackProps) => {
  const { reset } = useQueryErrorResetBoundary();

  const handleReset = () => {
    reset();
    resetErrorBoundary();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-4">
      <RiRestaurantLine className="w-12 h-12 text-gray-400" />
      <div className="text-center">
        <h2 className="text-lg font-bold mb-2">
          식당 정보를 불러오지 못했습니다
        </h2>
        <p className="text-gray-500 text-sm mb-4">잠시 후 다시 시도해 주세요</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-[#FF7058] text-white rounded-lg hover:bg-[#FF6147] transition-colors">
          다시 시도
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            닫기
          </button>
        )}
      </div>
    </div>
  );
};
