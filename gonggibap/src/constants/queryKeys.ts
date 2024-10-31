export const QUERY_KEYS = {
  RESTAURANT: {
    ALL: ["restaurants"] as const,
    DETAIL: (id: number) => ["restaurant", id] as const,
  },
  REVIEW: {
    DETAIL: (id: number) => ["review", id] as const,
  },
  HISTORY: {
    DETAIL: (id: number) => ["history", id] as const,
  },
};
