export interface Restaurant {
  id: number;
  restaurantName: string;
  link: string;
  category: string;
  address: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
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
