// RestaurantInfo.tsx
import Image from "next/image";
import { Star, Footprints, Coffee, Utensils, MapPin, Phone } from "lucide-react";
import { Restaurant } from "@/types/restaurant";

type RestaurantInfoProps = {
  restaurant: Restaurant;
};

export const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  const handleMoveToKakaoMap = () => {
    window.open(`https://place.map.kakao.com/${restaurant.restaurantLink}`);
  };

  return (
    <dl className="flex flex-col gap-2">
      <div className="flex items-center gap-5">
        <dt className="sr-only">관련 구청</dt>
        <dd className=""># {restaurant.publicOfficeName}</dd>

        <dt className="sr-only">음식점 평점</dt>
        <dd className="flex items-center gap-1 text-yellow-400">
          <Star size="1rem" />
          {restaurant.pointAvg ? restaurant.pointAvg.toFixed(1) : "-"}
        </dd>

        <dt className="sr-only">방문 횟수</dt>
        <dd className="flex items-center gap-1 text-[#FF9A00]">
          <Footprints size="1rem" /> {restaurant.visitCount}
        </dd>
      </div>
      
      <div>
        <dt className="sr-only">카테고리</dt>
        <dd className="flex items-center gap-1">
          {restaurant.restaurantDetailCategory === "카페" ? (
            <Coffee size="1rem" />
          ) : (
            <Utensils size="1rem" />
          )}
          {restaurant.restaurantCategory}
        </dd>
      </div>

      <div>
        <dt className="sr-only">주소</dt>
        <dd className="flex items-center gap-1">
          <MapPin size="1rem" /> {restaurant.restaurantRoadAddressName}
        </dd>
      </div>

      <div>
        <dt className="sr-only">전화번호</dt>
        <dd className="flex items-center gap-1">
          <Phone size="1rem" />
          {restaurant.phone ? restaurant.phone : "등록된 전화번호가 없습니다."}
        </dd>
      </div>

      <div>
        <dt className="sr-only">상세정보 웹사이트</dt>
        <dd className="flex gap-1 cursor-pointer" onClick={handleMoveToKakaoMap}>
          <Image
            src="/images/kakaomap.png"
            alt="카카오맵"
            width={24}
            height={24}
          />
          <p>카카오맵 상세정보</p>
        </dd>
      </div>
    </dl>
  );
};