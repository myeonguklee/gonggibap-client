import { useGetFavoriteRestaurants } from "@/apis/favorite";

export function FavoritesList() {
  const { data: favorites } = useGetFavoriteRestaurants();
  return (
    <div>
      {favorites?.content.map((favorite) => (
        <div key={favorite.restaurantId}>{favorite.restaurantName}</div>
      ))}
    </div>
  );
}
