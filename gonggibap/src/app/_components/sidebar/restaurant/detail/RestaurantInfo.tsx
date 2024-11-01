// RestaurantInfo.tsx
import { Restaurant } from "@/types/restaurant";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa6";

type RestaurantInfoProps = {
  restaurant: Restaurant;
};

export const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  // const handleMoveToKakaoMap = () => {
  //   window.open(`https://place.map.kakao.com/${restaurant.restaurantLink}`);
  // };

  const formatPointAvg = (point: number | null | undefined) => {
    return (point || 0).toFixed(1);
  };

  return (
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
      <button className="bg-[#FF7058] py-3 gap-1 flex justify-center items-center text-white font-semibold rounded-xl">
        <FaRegBookmark />내 지도에 추가하기
      </button>

      {/* <div>
        <dt className="sr-only">상세정보 웹사이트</dt>
        <dd
          className="flex gap-1 cursor-pointer"
          onClick={handleMoveToKakaoMap}
        >
          <Image
            src="/images/kakaomap.png"
            alt="카카오맵"
            width={24}
            height={24}
          />
          <p>카카오맵 상세정보</p>
        </dd>
      </div> */}
    </div>
  );
};
