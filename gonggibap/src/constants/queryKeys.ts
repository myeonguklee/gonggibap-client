export const QUERY_KEYS = {
  RESTAURANT: {
    ALL: ["restaurants"] as const,
    DETAIL: (id: number) => ["restaurant", id] as const,
  },
  REVIEW: {
    DETAIL: (id: number) => ["review", id] as const,
  },
  HISTORY: {
    DETAIL: (id: number, page: number) => ["history", id, page] as const,
  },
  FAVORITE: {
    ALL: ["favorite"] as const,
    CHECK: (id: number) => ["check", id] as const,
  },
};
