'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// gtag 타입 정의
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && GA_ID) {
      pageview(pathname);
    }
  }, [pathname]);

  // GA_ID가 없으면 아무것도 렌더링하지 않음
  if (!GA_ID) {
    return null;
  }

  // 페이지뷰 추적 함수
  const pageview = (path: string) => {
    window?.gtag?.('config', GA_ID, {
      page_path: path,
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

// 이벤트 추적을 위한 타입 정의
interface EventProps {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

// 이벤트 추적을 위한 유틸리티 함수
export const event = ({ action, category, label, value }: EventProps) => {
  if (!GA_ID) return;
  
  window?.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};