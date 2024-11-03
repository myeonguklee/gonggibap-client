import { useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';

import { RestaurantDetailCategory } from '@/types/restaurant';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { getCategoryIcon } from '@/utils/getCategoryIcon';

import { RESTAURANT_CATEGORIES } from '@/constants/category';

interface CategoryFilterProps {
  selectedCategory: RestaurantDetailCategory;
  onSelectCategory: (category: RestaurantDetailCategory) => void;
}

export const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const MAIN_CATEGORIES = isMobile
    ? RESTAURANT_CATEGORIES.slice(0, 2)
    : RESTAURANT_CATEGORIES.slice(0, 2);

  const OTHER_CATEGORIES = isMobile
    ? RESTAURANT_CATEGORIES.slice(2)
    : RESTAURANT_CATEGORIES.slice(2);

  const CategoryButton = ({
    value,
    label,
    isMoreMenu = false,
  }: {
    value: RestaurantDetailCategory | null;
    label: string;
    isMoreMenu?: boolean;
  }) => (
    <button
      onClick={() => {
        onSelectCategory(value);
        if (isMobile) setIsOpen(false);
      }}
      className={`flex w-full items-center gap-2 whitespace-nowrap px-3 py-1.5 text-sm transition-colors
          ${!isMoreMenu ? 'rounded-2xl shadow-md' : ''}
          ${
            selectedCategory === value
              ? 'bg-[#FF7058] font-semibold text-white hover:bg-[#FF8068]'
              : 'bg-white font-semibold text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}>
      {getCategoryIcon(value, 'w-4 h-4')}
      {label}
    </button>
  );

  // 더보기에 표시될 카테고리 목록
  const MoreCategories = () => (
    <div className="grid grid-cols-2">
      {OTHER_CATEGORIES.map((category, index) => (
        <div
          key={category.key}
          className={`border-b border-r border-gray-200 dark:border-gray-600 
            ${index >= OTHER_CATEGORIES.length - 2 ? 'border-b-0' : ''} 
            [&:nth-child(2n)]:border-r-0`}>
          <CategoryButton
            value={category.value}
            label={category.value}
            isMoreMenu={true}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={
        'fixed left-1/2 top-4 z-10 -translate-x-1/2 transition-all duration-300 md:left-[21rem] md:top-4 md:-translate-x-0'
      }>
      <div className="flex items-center gap-2 overflow-x-auto p-2">
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
              <button className="whitespace-nowrap rounded-2xl bg-white px-3 py-1.5 text-sm font-semibold text-gray-500 shadow-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                더보기
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 animate-slide-up rounded-t-3xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />
                <h2 className="mb-4 ml-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                  카테고리
                </h2>
                <div>
                  <MoreCategories />
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ) : (
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="whitespace-nowrap rounded-2xl bg-white px-3 py-1.5 text-sm font-semibold text-gray-500 shadow-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                더보기
              </button>
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content
                className="z-50 w-[280px] overflow-hidden rounded-lg bg-white dark:bg-black"
                sideOffset={5}
                align="end">
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
