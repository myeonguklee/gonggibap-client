'use client';

import ReactGA from 'react-ga4';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type EventProps = {
  category: string;
  action: string;
  label?: string;
  value?: number;
};

export const logEvent = ({ category, action, label, value }: EventProps) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

export const logPageView = (page: string) => {
  ReactGA.send({ hitType: "pageview", page });
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID!);
  }, []);

  useEffect(() => {
    const url = pathname + searchParams.toString();
    ReactGA.send({ hitType: "pageview", page: url });
  }, [pathname, searchParams]);

  return null;
}

// 차후 도메인 등록 후 layout에 <GoogleAnalytics /> 추가

// export default function SearchButton() {
//   const handleSearch = () => {
//     // 검색 로직
    
//     // 이벤트 추적
//     logEvent({
//       category: 'Search',
//       action: 'Click',
//       label: 'Restaurant Search',
//       value: 1
//     });
//   };

//   return <button onClick={handleSearch}>검색</button>;
// }