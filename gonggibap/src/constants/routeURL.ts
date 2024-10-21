export const QUERY_KEYS = {
  RESTAURENT: {
    ALL: ["restaurants"] as const,
    DETAIL: (id: number) => ["restaurant", id] as const,
  },
};
