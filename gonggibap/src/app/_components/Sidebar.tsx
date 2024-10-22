import React, { useState, useEffect, TouchEvent } from 'react';

type NavItem = {
  id: number;
  title: string;
  children: string[];
};

type MobilePosition = 'peek' | 'half' | 'full';

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobilePosition, setMobilePosition] = useState<MobilePosition>('peek');
  const [startY, setStartY] = useState<number>(0);
  const [currentY, setCurrentY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isNestedSidebarOpen, setIsNestedSidebarOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<NavItem | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault(); // 스크롤 방지
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = startY - currentY;
    const threshold = 30; // 민감도 조정

    if (Math.abs(diff) < threshold) return;

    if (diff > 0) { // 위로 스와이프
      if (mobilePosition === 'peek') setMobilePosition('half');
      else if (mobilePosition === 'half') setMobilePosition('full');
    } else { // 아래로 스와이프
      if (mobilePosition === 'full') setMobilePosition('half');
      else if (mobilePosition === 'half') setMobilePosition('peek');
    }
  };

  const handleItemClick = (item: NavItem) => {
    if (selectedItem?.id === item.id) {
      setIsNestedSidebarOpen(false);
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
      setIsNestedSidebarOpen(true);
    }
  };

  const navItems: NavItem[] = [
    { id: 1, title: '대시보드', children: ['일간 통계', '주간 통계', '월간 통계'] },
    { id: 2, title: '사용자 관리', children: ['회원 목록', '권한 관리', '활동 로그'] },
    { id: 3, title: '콘텐츠', children: ['게시물 관리', '댓글 관리', '미디어 라이브러리'] },
  ];

  // 모바일 사이드바 높이 클래스 계산
  const getMobileHeightClass = () => {
    switch (mobilePosition) {
      case 'peek':
        return 'h-24';
      case 'half':
        return 'h-1/2';
      case 'full':
        return 'h-[85vh]';
      default:
        return 'h-24';
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* 데스크톱 레이아웃 */}
      {!isMobile && (
        <div className="flex">
          {/* 메인 사이드바 */}
          <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed left-0 top-0 z-20">
            <div className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`w-full text-left p-2 rounded transition-colors
                    ${selectedItem?.id === item.id 
                      ? 'bg-gray-700 text-white' 
                      : 'hover:bg-gray-700'}`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          {/* 중첩 사이드바 */}
          <div 
            className={`w-64 h-screen bg-gray-700 text-white p-4 fixed left-64 top-0 
              transition-transform duration-300 ease-in-out z-10
              ${isNestedSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            {selectedItem && (
              <>
                <h3 className="font-bold mb-4">{selectedItem.title}</h3>
                <div className="space-y-2">
                  {selectedItem.children.map((child, index) => (
                    <div 
                      key={index} 
                      className="p-2 hover:bg-gray-600 rounded cursor-pointer"
                    >
                      {child}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 모바일 레이아웃 */}
      {isMobile && (
        <div
          className={`fixed bottom-0 left-0 w-full bg-gray-800 text-white 
            rounded-t-3xl shadow-lg transform transition-all duration-300 ease-out
            ${getMobileHeightClass()}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 드래그 핸들 */}
          <div 
            className="w-full h-6 flex justify-center items-center touch-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="w-10 h-1 bg-gray-600 rounded-full"></div>
          </div>

          {/* 스크롤 가능한 콘텐츠 영역 */}
          <div className="overflow-y-auto h-[calc(100%-1.5rem)] p-4">
            <div className="space-y-4">
              {navItems.map((item) => (
                <div key={item.id} className="space-y-2">
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`w-full text-left p-2 rounded transition-colors
                      ${selectedItem?.id === item.id 
                        ? 'bg-gray-700 text-white' 
                        : 'hover:bg-gray-700'}`}
                  >
                    {item.title}
                  </button>
                  <div 
                    className={`pl-4 space-y-2 overflow-hidden transition-all duration-300
                      ${selectedItem?.id === item.id ? 'max-h-48' : 'max-h-0'}`}
                  >
                    {item.children.map((child, index) => (
                      <div 
                        key={index} 
                        className="p-2 hover:bg-gray-700 rounded"
                      >
                        {child}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;