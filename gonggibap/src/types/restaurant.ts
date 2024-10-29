export interface GetRestaurantsResponse {
  totalPages: number;
  content: Restaurant[];
}

export interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  phone: string;
  restaurantLink: string;
  restaurantCategory: string;
  restaurantDetailCategory: RestaurantDetailCategory;
  restaurantAddressName: string;
  restaurantRoadAddressName: string;
  restaurantLatitude: number;
  restaurantLongitude: number;
  publicOfficeId: number;
  visitCount: number;
  pointAvg: number | null;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Polygon {
  firstCoordinate: Coordinate;
  secondCoordinate: Coordinate;
  thirdCoordinate: Coordinate;
  fourthCoordinate: Coordinate;
}

export type RestaurantDetailCategory =
  | "한식"
  | "카페"
  | "간식"
  | "일식"
  | "중식"
  | "양식"
  | "분식"
  | "술집"
  | "치킨"
  | "패스트푸드"
  | "아시아음식"
  | "기타"
  | "샤브샤브"
  | "샐러드"
  | "도시락"
  | null;
