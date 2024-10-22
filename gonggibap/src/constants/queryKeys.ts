export const QUERY_KEYS = {
  RESTAURANT: {
    ALL: ["restaurants"] as const,
    DETAIL: (id: number) => ["restaurant", id] as const,
  },
};
