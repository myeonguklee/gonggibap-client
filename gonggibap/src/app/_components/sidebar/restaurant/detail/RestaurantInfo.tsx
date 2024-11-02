import { useState } from "react";
import { Restaurant } from "@/types/restaurant";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginConfirmationModal } from "@/components/LoginConfirmationModal";
import { useCreateFavoriteRestaurant } from "@/apis/favorite";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa6";

type RestaurantInfoProps = {
  restaurant: Restaurant;
};

export const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  const { mutate: createFavoriteRestaurant } = useCreateFavoriteRestaurant();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleFavoriteCreate = () => {
    const isLogin = useAuthStore.getState().isLogin;
    if (!isLogin) {
      setIsModalOpen(true);
      return;
    }
    createFavoriteRestaurant(restaurant.restaurantId);
  };

  const formatPointAvg = (point: number | null | undefined) => {
    return point ? point.toFixed(1) : "-";
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="inline-block">
          <span className="bg-black text-white px-4 py-1 rounded-xl text-sm dark:bg-white dark:text-black">
            {restaurant.publicOfficeName}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 font-semibold">
            <IoLocationOutline />
            {restaurant.restaurantAddressName}
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <IoCallOutline />
            {restaurant.phone ? restaurant.phone : "미제공"}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-1">
            <div className="text-gray-500">평점</div>
            <div className="bg-[#FF7058] text-white rounded-xl px-3">
              {formatPointAvg(restaurant.pointAvg)}
            </div>
          </div>
          <div className="flex gap-1">
            <div className="text-gray-500">방문수</div>
            <div>{restaurant.visitCount}</div>
          </div>
        </div>
        <button
          onClick={handleFavoriteCreate}
          className="bg-[#FF7058] py-3 gap-1 flex justify-center items-center text-white font-semibold rounded-xl"
        >
          <FaRegBookmark />내 지도에 추가하기
        </button>
      </div>
      <LoginConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
