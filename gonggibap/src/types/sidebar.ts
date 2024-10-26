import { MOBILE_VIEWS } from "@/constants/sidebar";

export type MobileView = (typeof MOBILE_VIEWS)[keyof typeof MOBILE_VIEWS];

export type MobilePosition = "peek" | "half" | "full";
