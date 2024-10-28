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
  restaurantDetailCategory: string;
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
