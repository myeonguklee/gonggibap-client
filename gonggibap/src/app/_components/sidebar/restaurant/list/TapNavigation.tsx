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
      className={`flex rounded-lg bg-gray-100 p-1 dark:bg-gray-300 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex-1 rounded-md px-4 py-2 text-sm transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-white font-bold text-[#FF7058] shadow-sm dark:bg-gray-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onTabChange(tab.id)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
