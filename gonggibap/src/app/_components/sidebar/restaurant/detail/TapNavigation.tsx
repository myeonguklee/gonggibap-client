type TabType = "reviews" | "history";

interface TapNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TapNavigation({ activeTab, onTabChange }: TapNavigationProps) {
  return (
    <div className="p-1 bg-gray-100 dark:bg-gray-300 rounded-lg flex">
      <button
        className={`flex-1 px-4 py-2  rounded-md text-sm transition-all duration-200 ${
          activeTab === "reviews"
            ? "bg-white dark:bg-gray-700 text-[#FF7058] font-bold shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => onTabChange("reviews")}
      >
        리뷰
      </button>
      <button
        className={`flex-1 px-4 py-2 rounded-md text-sm transition-all duration-200 ${
          activeTab === "history"
            ? "bg-white dark:bg-gray-700 text-[#FF7058] font-bold shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => onTabChange("history")}
      >
        사용내역
      </button>
    </div>
  );
}
