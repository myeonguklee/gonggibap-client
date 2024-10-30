import { useState, useEffect } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // window.matchMedia() css미디어 쿼리를 js에서 사용할수 있게 해주는 Web API
    // ex) useMediaQuery("(max-width: 768px)");를 전달하면
    // 현재 화면 크기가 768px보다 작은지 판단
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
};
