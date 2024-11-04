import { useState } from 'react';

import { useAuthStore } from '@/store/useAuthStore';

import { MapPinLoading } from '@/app/_components/MapPinLoading';
import { Pagination } from '@/app/_components/Pagination';
import { FavoritesListItem } from '@/app/_components/sidebar/favorite';

import { useGetFavoriteRestaurants } from '@/apis/favorite';

interface FavoritesListProps {
  onTabChange: (tab: string) => void;
}

export function FavoritesList({ onTabChange }: FavoritesListProps) {
  const { isLogin } = useAuthStore();
  const { data: favorites, isLoading, error } = useGetFavoriteRestaurants();
  const [currentPage, setCurrentPage] = useState(0);

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  if (!isLogin) {
    return (
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex-center">
        <div className="flex flex-col gap-5 text-center">
          <p className="text-white">로그인이 필요합니다</p>
          <div className="flex gap-3">
            <button
              onClick={() => onTabChange('list')}
              className="rounded-lg min-w-[8rem] bg-gray-400 px-6 py-2 text-white hover:bg-gray-500">
              취소
            </button>
            <a
              href="/login"
              className="inline-block rounded-lg bg-[#FF7058] px-6 py-2 font-bold text-white hover:bg-[#ff7158da]">
              로그인하기
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <MapPinLoading />;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <>
      {favorites && favorites.content.length === 0 && (
        <p className="text-center">검색된 식당이 없습니다.</p>
      )}
      <ul className="flex w-full flex-col gap-2">
        {favorites?.content.map((favorite, index) => (
          <li key={favorite.restaurantId}>
            <FavoritesListItem restaurant={favorite} index={index} />
            {index !== favorites.content.length - 1 && (
              <div className="flex-center">
                <div className="w-full border-b dark:border-gray-500"></div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {favorites && favorites?.content.length > 0 && (
        <Pagination
          totalPages={favorites?.totalPages ? favorites.totalPages : 1}
          currentPage={currentPage}
          onPageChange={handleCurrentPage}
        />
      )}
    </>
  );
}
