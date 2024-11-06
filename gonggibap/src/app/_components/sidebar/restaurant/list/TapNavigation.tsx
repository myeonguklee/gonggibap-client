import { LoginConfirmationModal } from '@/components/LoginConfirmationModal';
import { useAuthStore } from '@/store/useAuthStore';
import { useState } from 'react';

interface TabNavigationProps {
  isFavorite: boolean;
  onTabChange: (isFavorite: boolean) => void;
}

export function TabNavigation({ isFavorite, onTabChange }: TabNavigationProps) {
  const auth = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tabs = [
    { id: 'list', label: '맛집 리스트' },
    { id: 'favorite', label: '내가 찜한' },
  ];

  const handleTabClick = (isFavoriteTab: boolean) => {
    // favorite 탭을 클릭했고 로그인하지 않은 상태라면 모달을 띄움
    if (isFavoriteTab && !auth.isLogin) {
      setIsModalOpen(true);
      return;
    }
    // 그 외의 경우(일반 리스트 탭이거나 이미 로그인된 상태)는 탭 변경
    onTabChange(isFavoriteTab);
  };

  return (
    <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-300">
      {tabs.map((tab) => {
        const isActive = (tab.id === 'favorite') === isFavorite;
        return (
          <button
            key={tab.id}
            className={`flex-1 rounded-md px-4 py-2 text-sm transition-all duration-200 ${
              isActive
                ? 'bg-white font-bold text-[#FF7058] shadow-sm dark:bg-gray-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabClick(tab.id === 'favorite')}>
            {tab.label}
          </button>
        );
      })}
      {isModalOpen && (
        <LoginConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
