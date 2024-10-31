import { ReactElement } from "react";
import { ImSpoonKnife } from "react-icons/im";
import { BiSolidCoffeeAlt } from "react-icons/bi";
import { RiBeerFill } from "react-icons/ri";
import { RestaurantDetailCategory } from "@/types/restaurant";

export const getCategoryIcon = (
  value: RestaurantDetailCategory | null,
  className?: string
): ReactElement | null => {
  switch (value) {
    case null:
      return <ImSpoonKnife className={className} />;
    case "카페":
      return <BiSolidCoffeeAlt className={className} />;
    case "술집":
      return <RiBeerFill className={className} />;
    default:
      return null;
  }
};
