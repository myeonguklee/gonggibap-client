export interface GetHistoriesResponse {
  totalPages: number;
  content: history[];
}

export interface history {
  restaurantId: number;
  restaurantName: string;
  publicOfficeName: string;
  historyDate: string;
  peopleCount: number;
  price: number;
  useContent: string;
  consumer: string;
}
