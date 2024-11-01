export const getRelativeTime = (dateString: string): string => {
  // 날짜만 비교하기 위해 시간을 제거
  const today = new Date();
  const date = new Date(dateString);

  // 날짜 정규화 (시간 제거)
  const normalizedToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const normalizedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diffInDays = Math.floor(
    (normalizedToday.getTime() - normalizedDate.getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const diffInMonths =
    (today.getFullYear() - date.getFullYear()) * 12 +
    today.getMonth() -
    date.getMonth();
  const diffInYears = today.getFullYear() - date.getFullYear();

  switch (true) {
    case diffInDays === 0:
      return "오늘";
    case diffInDays === 1:
      return "어제";
    case diffInDays === 2:
      return "그제";
    case diffInDays === 7:
      return "일주일 전";
    case diffInDays === 14:
      return "2주일 전";
    case diffInDays < 7:
      return `${diffInDays}일 전`;
    case diffInDays < 14:
      return "일주일 전";
    case diffInDays < 21:
      return "2주일 전";
    case diffInDays < 28:
      return "3주일 전";
    case diffInMonths === 1:
      return "한달 전";
    case diffInMonths === 3:
      return "3달 전";
    case diffInMonths === 6:
      return "6달 전";
    case diffInMonths < 12:
      return `${diffInMonths}달 전`;
    case diffInYears === 1:
      return "1년 전";
    default:
      return `${diffInYears}년 전`;
  }
};
