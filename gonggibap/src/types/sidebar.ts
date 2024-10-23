import { MOBILE_VIEWS } from "@/constants/sidebar";

export type MobileView = (typeof MOBILE_VIEWS)[keyof typeof MOBILE_VIEWS];

export type MobilePosition = "peek" | "half" | "full";

export type Restaurant = {
  id: number;
  name: string;
  rating: number;
  category: string;
  distance: string;
  details: RestaurantDetails;
};

export type RestaurantDetails = {
  address: string;
  openingHours: string;
  phoneNumber: string;
  menu: MenuItem[];
  reviews: Review[];
};

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export type Review = {
  id: number;
  userName: string;
  rating: number;
  content: string;
  date: string;
};
