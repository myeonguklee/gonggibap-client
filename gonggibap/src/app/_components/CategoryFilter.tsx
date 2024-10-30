import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import { RestaurantDetailCategory } from "@/types/restaurant";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { RESTAURANT_CATEGORIES } from "@/constants/category";

interface CategoryFilterProps {
  selectedCategory: RestaurantDetailCategory;
  onSelectCategory: (category: RestaurantDetailCategory) => void;
}

// 메인에 보여줄 카테고리
const MAIN_CATEGORIES = RESTAURANT_CATEGORIES.slice(0, 3);
const OTHER_CATEGORIES = RESTAURANT_CATEGORIES.slice(3);

export const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const CategoryButton = ({
    value,
    label,
  }: {
    value: RestaurantDetailCategory | null;
    label: string;
  }) => (
    <button
      onClick={() => onSelectCategory(value)}
      className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors shadow-md
            ${
              selectedCategory === value
                ? "bg-[#FF7058] font-semibold text-white hover:bg-[#FF8068]"
                : "bg-white font-semibold text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
    >
      {label}
    </button>
  );

  // 더보기에 표시될 카테고리 목록
  const MoreCategories = () => (
    <div className="grid grid-cols-2 gap-2">
      {OTHER_CATEGORIES.map((category) => (
        <CategoryButton
          key={category.key}
          value={category.value}
          label={category.value}
        />
      ))}
    </div>
  );

  return (
    <div
      className={
        "fixed left-1/2 -translate-x-1/2 top-4 md:top-4 z-10 transition-all duration-300"
      }
    >
      <div className="flex items-center gap-2 p-2 overflow-x-auto">
        <CategoryButton value={null} label="음식점" />

        {MAIN_CATEGORIES.map((category) => (
          <CategoryButton
            key={category.key}
            value={category.value}
            label={category.value}
          />
        ))}

        {isMobile ? (
          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
              <button className="px-3 py-1.5 shadow-md font-semibold rounded-lg text-sm whitespace-nowrap bg-white hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-300">
                더보기
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
              <Dialog.Content className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-3xl p-6 z-50 animate-slide-up">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />
                <MoreCategories />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ) : (
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="px-3 py-1.5 shadow-md font-semibold rounded-lg text-sm whitespace-nowrap bg-white hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-300">
                더보기
              </button>
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content
                className="bg-white dark:bg-black rounded-lg p-2 w-[280px] z-50"
                sideOffset={5}
                align="end"
              >
                <MoreCategories />
                <Popover.Arrow className="fill-white dark:fill-gray-800" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )}
      </div>
    </div>
  );
};
