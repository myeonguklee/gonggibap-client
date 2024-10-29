import * as Popover from "@radix-ui/react-popover";
import { RestaurantDetailCategory } from "@/types/restaurant";
import { RESTAURANT_CATEGORIES } from "@/constants/category";

interface CategoryFilterProps {
  selectedCategory: RestaurantDetailCategory;
  onSelectCategory: (category: RestaurantDetailCategory) => void;
  isDetailOpen?: boolean;
}

// 메인에 보여줄 카테고리
const MAIN_CATEGORIES = RESTAURANT_CATEGORIES.slice(0, 3);
const OTHER_CATEGORIES = RESTAURANT_CATEGORIES.slice(3);

export const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
  isDetailOpen,
}: CategoryFilterProps) => {
  const CategoryButton = ({
    value,
    label,
  }: {
    value: RestaurantDetailCategory | null;
    label: string;
  }) => (
    <button
      onClick={() => onSelectCategory(value)}
      className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors
            ${
              selectedCategory === value
                ? "bg-[#FF7058] font-semibold text-white hover:bg-[#FF8068]"
                : "bg-white font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
    >
      {label}
    </button>
  );
  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 top-16 md:top-4 z-10 transition-all duration-300 
        ${
          isDetailOpen ? "-translate-y-full md:translate-y-0" : "translate-y-0"
        }`}
    >
      <div className="flex items-center gap-2 p-2 overflow-x-auto">
        <CategoryButton value={null} label="전체" />

        {MAIN_CATEGORIES.map((category) => (
          <CategoryButton
            key={category.key}
            value={category.value}
            label={category.value}
          />
        ))}

        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="px-3 py-1.5 font-semibold rounded-lg text-sm whitespace-nowrap bg-white hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">
              더보기
            </button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              className="bg-white dark:bg-black rounded-lg p-2 w-[280px] z-50"
              sideOffset={5}
              align="end"
            >
              <div className="grid grid-cols-2 gap-2">
                {OTHER_CATEGORIES.map((category) => (
                  <CategoryButton
                    key={category.key}
                    value={category.value}
                    label={category.value}
                  />
                ))}
              </div>
              <Popover.Arrow className="fill-white dark:fill-gray-800" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
};
