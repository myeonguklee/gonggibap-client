export const QUERY_KEYS = {
  RESTAURANT: {
    ALL: ["restaurants"] as const,
    DETAIL: (id: number) => ["restaurant", id] as const,
  },
  REVIEW: {
    ALL: ["reviews"] as const,
    DETAIL: (id: number) => ["review", id] as const,
  },
};
