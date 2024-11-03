import { ReactElement } from 'react';
import { ImSpoonKnife } from 'react-icons/im';
import { BiSolidCoffeeAlt } from 'react-icons/bi';
import { RiBeerFill } from 'react-icons/ri';
import { RestaurantDetailCategory } from '@/types/restaurant';
import { FaBowlFood } from 'react-icons/fa6'; // 한식
import { GiNoodles } from 'react-icons/gi'; // 일식
import { GiChickenOven } from 'react-icons/gi'; // 치킨
import { IoFastFood } from 'react-icons/io5'; // 패스트푸드
import { MdRamenDining } from 'react-icons/md'; // 분식
import { GiDumpling } from 'react-icons/gi'; // 중식
import { GiMeat } from 'react-icons/gi'; // 양식
import { LuSalad } from 'react-icons/lu'; // 샐러드
import { GiPopcorn } from 'react-icons/gi'; // 간식
import { BsBox2HeartFill } from 'react-icons/bs'; // 도시락
import { GiFastNoodles } from 'react-icons/gi'; // 아시아음식

export const getCategoryIcon = (
  value: RestaurantDetailCategory | null,
  className?: string,
): ReactElement | null => {
  switch (value) {
    case null:
      return <ImSpoonKnife className={className} />;
    case '카페':
      return <BiSolidCoffeeAlt className={className} />;
    case '술집':
      return <RiBeerFill className={className} />;
    case '한식':
      return <FaBowlFood className={className} />;
    case '중식':
      return <GiDumpling className={className} />;
    case '일식':
      return <GiNoodles className={className} />;
    case '양식':
      return <GiMeat className={className} />;
    case '치킨':
      return <GiChickenOven className={className} />;
    case '패스트푸드':
      return <IoFastFood className={className} />;
    case '샐러드':
      return <LuSalad className={className} />;
    case '분식':
      return <MdRamenDining className={className} />;
    case '간식':
      return <GiPopcorn className={className} />;
    case '도시락':
      return <BsBox2HeartFill className={className} />;
    case '아시아음식':
      return <GiFastNoodles className={className} />;
    default:
      return null;
  }
};
