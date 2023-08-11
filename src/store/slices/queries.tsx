import { createSlice } from "@reduxjs/toolkit";

type QueryType = {
  key: string;
  data: any;
  staleTime: number;
};

export const queriesSlice = createSlice({
  name: "queries",
  initialState: {
    queries: [] as QueryType[],
  },
  reducers: {
    addQuery: (state, action) => {
      const { payload } = action;

      const queryIndex = state.queries.findIndex(
        (query) => query.key === payload.key
      );

      const query = {
        key: payload.key,
        data: payload.data,
        staleTime: payload.staleTime,
      };

      if (queryIndex !== -1) state.queries[queryIndex] = query;
      else state.queries.push(query);
    },
  },
});

export const { addQuery } = queriesSlice.actions;
export default queriesSlice.reducer;
