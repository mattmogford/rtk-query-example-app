import { ServiceType } from "../../types";
import { APIEndpointBuilder } from "./types";

export const getQueries = (builder: APIEndpointBuilder) => ({
  listServiceTypes: builder.query<ServiceType[], undefined>({
    query: () => "/service-types",
  }),
});
