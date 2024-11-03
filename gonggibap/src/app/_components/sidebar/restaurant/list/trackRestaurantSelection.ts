import { Restaurant } from '@/types/restaurant';

import { event } from '@/app/_components/GoogleAnalytics';

export const trackRestaurantSelection = (restaurant: Restaurant) => {
  event({
    action: 'select_restaurant',
    category: 'engagement',
    label: restaurant.restaurantName,
    value: 1,
  });

  event({
    action: 'view_restaurant_details',
    category: 'restaurant_interaction',
    label: `${restaurant.restaurantCategory} | ${restaurant.restaurantName}`,
    value: restaurant.visitCount,
  });
};
