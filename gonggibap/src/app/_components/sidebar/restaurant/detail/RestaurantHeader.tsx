import { ChevronLeft, X } from "lucide-react";

type RestaurantHeaderProps = {
  restaurantName: string;
  onClose?: () => void;
  onBack?: () => void;
};

export const RestaurantHeader = ({ restaurantName, onClose, onBack }: RestaurantHeaderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="hidden md:block">
        <div className="flex-between-center">
          <button
            onClick={onClose}
            className="hover:bg-gray-100 dark:hover:bg-gray-600"
            aria-label="닫기"
          >
            <ChevronLeft size="1.5rem" />
          </button>
          <h2 className="text-xl font-bold">{restaurantName}</h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 dark:hover:bg-gray-600"
            aria-label="닫기"
          >
            <X size="1.5rem" />
          </button>
        </div>
      </div>

      <div className="block md:hidden">
        <div className="flex-between-center">
          <button
            onClick={onBack}
            className="rounded dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            aria-label="뒤로 가기"
          >
            <ChevronLeft size="1.5rem" />
          </button>
          <h2 className="text-xl font-bold">{restaurantName}</h2>
          <button
            onClick={onBack}
            className="rounded dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            aria-label="뒤로 가기"
          >
            <X size="1.5rem" />
          </button>
        </div>
      </div>
    </div>
  );
};