// 일반적으로 상수는 UPPER_SNAKE_CASE를 사용하지만, 라우트는 camelCase사용
// 1. 실제 URL 경로도 소문자를 사용
// 2. 라우트는 설정값이라기보다 실제 사용되는 경로의 의미가 강함
export const routeURL = {
  home: '/',
  login: '/login',
} as const;
