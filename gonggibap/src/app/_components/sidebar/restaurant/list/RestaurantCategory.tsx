import { Coffee, Utensils } from "lucide-react";

export const RestaurantCategory = ({ category }: { category: string }) => (
  <div className="flex items-center gap-1">
    <span className="sr-only">음식점 카테고리</span>
    {category === "카페" ? <Coffee size="1rem" /> : <Utensils size="1rem" />}
    {category}
  </div>
);
