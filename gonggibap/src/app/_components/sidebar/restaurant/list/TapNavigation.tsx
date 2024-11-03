interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: TabNavigationProps) {
  return (
    <div
      className={`p-1 bg-gray-100 dark:bg-gray-300 rounded-lg flex ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex-1 px-4 py-2 rounded-md text-sm transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-white dark:bg-gray-600 text-[#FF7058] font-bold shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onTabChange(tab.id)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
