import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChevronLeft, X } from "lucide-react";

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
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex-between-center">
      <div className="flex items-center gap-2">
        <button
          onClick={isMobile ? onBack : onClose}
          className="rounded dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
          aria-label={isMobile ? "뒤로 가기" : "닫기"}
        >
          <ChevronLeft size="1.5rem" />
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black">{restaurantName}</h1>
          {restaurantDetailCategory && (
            <h2 className="text-gray-500 font-bold translate-y-1">
              {restaurantDetailCategory}
            </h2>
          )}
        </div>
      </div>

      {!isMobile && (
        <button
          onClick={onClose}
          className="hover:bg-gray-100 dark:hover:bg-gray-600"
          aria-label="닫기"
        >
          <X size="1.5rem" />
        </button>
      )}
    </div>
  );
};
