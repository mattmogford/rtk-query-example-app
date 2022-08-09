import { NewServiceType, ServiceType } from "../../types";
import { APIEndpointBuilder } from "./types";

export const getMutations = (builder: APIEndpointBuilder) => ({
  createServiceType: builder.mutation<ServiceType, NewServiceType>({
    query: (body) => ({
      url: "/service-type",
      method: "POST",
      body,
    }),
  }),
});
