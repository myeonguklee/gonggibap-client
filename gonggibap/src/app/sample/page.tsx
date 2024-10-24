"use client";
import { Sidebar } from "@/app/_components/Sidebar";
import { Restaurant } from "@/types/sidebar";
import { ThemeToggleBtn } from "@/app/_components/ThemeToggleBtn";

const sampleData: Restaurant[] = [
  {
    id: 1,
    name: "맛있는 돈까스",
    rating: 4,
    category: "일식",
    distance: "0.3km",
    details: {
      address: "서울시 강남구 역삼동 123-45",
      openingHours: "11:00 - 21:00",
      phoneNumber: "02-1234-5678",
      menu: [
        {
          id: 1,
          name: "히레 돈까스",
          price: 12000,
          description: "부드러운 히레 부위로 만든 돈까스",
        },
        {
          id: 2,
          name: "히레 돈까스",
          price: 12000,
          description: "부드러운 히레 부위로 만든 돈까스",
        },
        {
          id: 3,
          name: "히레 돈까스",
          price: 12000,
          description: "부드러운 히레 부위로 만든 돈까스",
        },
        {
          id: 4,
          name: "히레 돈까스",
          price: 12000,
          description: "부드러운 히레 부위로 만든 돈까스",
        },
        {
          id: 5,
          name: "히레 돈까스",
          price: 12000,
          description: "부드러운 히레 부위로 만든 돈까스",
        },
        // ... more menu items
      ],
      reviews: [
        {
          id: 1,
          userName: "김맛있",
          rating: 5,
          content: "돈까스가 정말 맛있어요!",
          date: "2024-03-15",
        },
        {
          id: 2,
          userName: "김맛있",
          rating: 5,
          content: "돈까스가 정말 맛있어요!",
          date: "2024-03-15",
        },
        {
          id: 3,
          userName: "김맛있",
          rating: 5,
          content: "돈까스가 정말 맛있어요!",
          date: "2024-03-15",
        },
        {
          id: 4,
          userName: "김맛있",
          rating: 5,
          content: "돈까스가 정말 맛있어요!",
          date: "2024-03-15",
        },
        {
          id: 5,
          userName: "김맛있",
          rating: 5,
          content: "돈까스가 정말 맛있어요!",
          date: "2024-03-15",
        },
        // ... more reviews
      ],
    },
  },
  // ... more restaurants
];

export default function SamplePage() {
  return (
    <div className="min-h-screen">
      <div>샘플페이지</div>
      <ThemeToggleBtn />
    </div>
  );
}
