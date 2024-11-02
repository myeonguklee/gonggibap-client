"use client";

import { useGetRestaurant } from "@/apis/restaurant/useGetRestaurant";
import { MapPinLoading } from "@/app/_components/MapPinLoading";
import { Sidebar } from "@/app/entry/[id]/_components/Sidebar";

interface SharePageProps {
  params: {
    id: string; // Next.js는 URL 파라미터를 항상 문자열로 전달
  };
}

export default function SharePage({ params }: SharePageProps) {
  const restaurantId = params.id;
  const { data: restaurant, isLoading } = useGetRestaurant(
    Number(restaurantId)
  );

  if (isLoading) {
    return (
      <div className="w-screen h-screen">
        <MapPinLoading />
      </div>
    );
  }

  if (!restaurant) {
    return <div>식당 정보가 존재하지 않습니다.</div>;
  }

  return (
    <>
      <Sidebar restaurant={restaurant} />
    </>
  );
}
