import { Metadata } from 'next';

import { getServerRestaurant } from '@/apis/restaurant/getServerRestaurant';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const restaurant = await getServerRestaurant(Number(params.id));
    const title = `${restaurant.restaurantName}`;

    return {
      title,
      description: restaurant.restaurantDetailCategory,
      openGraph: {
        title: `${restaurant.restaurantName} : 공기밥`,
        description: `${restaurant.restaurantAddressName}`,
        images: [
          {
            url: restaurant.restaurantImage,
            width: 1200,
            height: 630,
            alt: `${restaurant.restaurantName} - 공기밥`,
          },
        ],
        type: 'website',
        locale: 'ko_KR',
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/entry/${params.id}`,
        siteName: '공기밥',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: restaurant.restaurantName,
        images: [restaurant.restaurantImage],
      },
    };
  } catch {
    return {
      title: '레스토랑을 찾을 수 없습니다',
      description: '요청하신 레스토랑 정보를 불러올 수 없습니다.',
      openGraph: {
        title: '레스토랑을 찾을 수 없습니다',
        description: '요청하신 레스토랑 정보를 불러올 수 없습니다.',
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/images/ogImage.png`,
            width: 1200,
            height: 630,
            alt: '공기밥 - 공무원 맛집 추천',
          },
        ],
      },
    };
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
