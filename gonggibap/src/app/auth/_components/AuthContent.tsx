'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';




import { toast } from 'react-toastify';

import { useAuthStore } from '@/store/useAuthStore';

import { getUserInfo } from '@/apis/user';

import { routeURL } from '@/constants/routeURL';


export function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAccessToken, setUserInfo } = useAuthStore();

  useEffect(() => {
    const fetchUserAndRedirect = async (accessToken: string) => {
      try {
        setAccessToken(accessToken);
        const userInfo = await getUserInfo();
        setUserInfo(userInfo);
        toast.success('로그인에 성공했습니다.');
        router.push(routeURL.home);
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        toast.error('사용자 정보 조회에 실패했습니다.');
        router.push(routeURL.login);
      }
    };

    // url에서 accessToken 가져오기
    const accessToken = searchParams.get('accessToken');
    if (accessToken) {
      fetchUserAndRedirect(accessToken);
    } else {
      toast.error('로그인에 실패했습니다.');
      router.push(routeURL.login);
    }
  }, [searchParams, setAccessToken, setUserInfo, router]);

  return (
    <main className="flex h-screen items-center justify-center">
      <section
        className="flex flex-col items-center"
        aria-label="로그인 진행 상태">
        <figure>
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={128}
            height={128}
            priority
          />
        </figure>
        <h1>로그인 중입니다</h1>
      </section>
    </main>
  );
}
