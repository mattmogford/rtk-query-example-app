import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { selectToken } from "./selectors";
import { RootState } from "./store";
import { Headers, NewVariant, Variant, ServiceType } from "./types";

export const serviceURL = "https://fake-url.com/";

export const myAPIService = createApi({
  reducerPath: "myAPIService",
  baseQuery: fetchBaseQuery({
    baseUrl: serviceURL,
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState() as RootState);
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set(Headers.Authorization, `Bearer ${token}`);
      }
      headers.set(Headers.Accept, "application/json");
      return headers;
    },
    mode: "cors",
  }),
  endpoints: (builder) => ({
    listServiceTypes: builder.query<ServiceType[], undefined>({
      query: () => "/service-types",
    }),
    createVariant: builder.mutation<Variant, NewVariant>({
      query: (body) => ({
        url: "/variant",
        method: "POST",
        body,
      }),
    }),
  }),
});
