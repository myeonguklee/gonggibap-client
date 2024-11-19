import { BaseResponse } from '@/types/apiResponse';
import { Restaurant } from '@/types/restaurant';

export async function getServerRestaurant(
  restaurantId: number,
): Promise<Restaurant> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/${restaurantId}`,
    {
      next: {
        revalidate: 60, // 60초마다 재검증
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch restaurant');
  }

  const data: BaseResponse<Restaurant> = await response.json();
  return data.data;
}
