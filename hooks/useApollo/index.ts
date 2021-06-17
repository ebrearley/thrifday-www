import { useMemo } from "react";
import { initializeApollo } from "../../lib/apolloClient";

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo({ initialState }), [initialState]);
  return store;
}
