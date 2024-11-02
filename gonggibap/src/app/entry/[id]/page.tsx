"use client";

import { useGetRestaurant } from "@/apis/restaurant/useGetRestaurant";
import { Sidebar } from "@/app/entry/[id]/_components/Sidebar";

interface SharePageProps {
  params: {
    id: string; // Next.js는 URL 파라미터를 항상 문자열로 전달
  };
}

export default function SharePage({ params }: SharePageProps) {
  const restaurantId = params.id;
  const { data: restaurant } = useGetRestaurant(Number(restaurantId));

  return (
    <>
      <Sidebar restaurant={restaurant} />
    </>
  );
}
