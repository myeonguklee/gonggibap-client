interface Tab {
  id: string;
  label: string;
}

interface RestaurantTabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export function RestaurantTapNavigation({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: RestaurantTabNavigationProps) {
  return (
    <div className={`flex w-full border-b-2 border-gray-500 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex-1 px-4 py-2 text-sm relative transition-all duration-200 font-semibold
              ${
                activeTab === tab.id
                  ? "text-[#FF7058]"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-[-1.8px] left-0 w-full h-[2px] bg-[#FF7058]" />
          )}
        </button>
      ))}
    </div>
  );
}
