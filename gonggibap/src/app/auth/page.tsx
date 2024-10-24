"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { routeURL } from "@/constants/routeURL";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAccessToken } = useAuthStore();

  useEffect(() => {
    // url에서 accessToken 가져오기
    const accessToken = searchParams.get("accessToken");
    if (accessToken) {
      setAccessToken(accessToken);
      toast.success("로그인에 성공했습니다.");
      router.push(routeURL.home);
    } else {
      toast.error("로그인에 실패했습니다.");
      router.push(routeURL.login);
    }
  }, [searchParams, setAccessToken, router]);

  return (
    <main className="flex items-center justify-center h-screen">
      <section
        className="flex flex-col items-center"
        aria-label="로그인 진행 상태"
      >
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
