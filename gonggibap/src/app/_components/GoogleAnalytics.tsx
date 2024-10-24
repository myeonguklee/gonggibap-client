'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// gtag 타입 정의를 더 구체적으로 수정
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      // Record<string, any> 대신 더 구체적인 타입 정의
      config?: {
        page_path?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: unknown;  // 기타 가능한 속성들을 위한 인덱스 시그니처
      }
    ) => void;
    // any[] 대신 구체적인 타입 정의
    dataLayer: Array<{
      event?: string;
      [key: string]: unknown;
    }>;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && GA_ID) {
      pageview(pathname);
    }
  }, [pathname]);

  if (!GA_ID) {
    return null;
  }

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

interface EventProps {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: EventProps) => {
  if (!GA_ID) return;
  
  window?.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};