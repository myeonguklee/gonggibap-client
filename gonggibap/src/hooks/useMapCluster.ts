import { useRef, useEffect } from 'react';

interface UseMapClusterProps {
  map: kakao.maps.Map | null;
}

export const useMapCluster = ({ map }: UseMapClusterProps) => {
  const clusterRef = useRef<kakao.maps.MarkerClusterer | null>(null);

  const getClusterStyles = () => [
    // 마커 수가 적을 때
    {
      width: '50px',
      height: '50px',
      background: '#FF9A00',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '50px',
      borderRadius: '25px',
      opacity: '0.9',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    // 마커 수가 많을 때
    {
      width: '60px',
      height: '60px',
      background: '#FF9A00',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '60px',
      borderRadius: '30px',
      opacity: '0.7',
      fontSize: '18px',
      fontWeight: 'bold',
    },
  ];

  useEffect(() => {
    if (!map) return;

    // 클러스터러 초기화
    clusterRef.current = new window.kakao.maps.MarkerClusterer({
      map, // 클러스터를 표시할 지도 객체
      averageCenter: true, // 클러스터의 중심을 평균 좌표로 설정
      minLevel: 6, // 클러스터가 보여질 최소 지도 레벨(줌 레벨)
      styles: getClusterStyles(), //클러스터 스타일
    });
  }, [map]);

  return {
    cluster: clusterRef.current,
  };
};
