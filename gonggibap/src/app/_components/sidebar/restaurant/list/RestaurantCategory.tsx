import { RestaurantDetailCategory } from '@/types/restaurant';
import { getCategoryIcon } from '@/utils/getCategoryIcon';

export const RestaurantCategory = ({
  category,
}: {
  category: RestaurantDetailCategory;
}) => (
  <div className="flex items-center gap-1">
    <span className="sr-only">음식점 카테고리</span>
    {getCategoryIcon(category)}
    {category}
  </div>
);
