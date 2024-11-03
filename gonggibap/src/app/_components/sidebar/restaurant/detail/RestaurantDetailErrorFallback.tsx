
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
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <RiRestaurantLine className="size-12 text-gray-400" />
      <div className="text-center">
        <h2 className="mb-2 text-lg font-bold">
          식당 정보를 불러오지 못했습니다
        </h2>
        <p className="mb-4 text-sm text-gray-500">잠시 후 다시 시도해 주세요</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleReset}
          className="rounded-lg bg-[#FF7058] px-4 py-2 text-white transition-colors hover:bg-[#FF6147]">
          다시 시도
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-100">
            닫기
          </button>
        )}
      </div>
    </div>
  );
};
