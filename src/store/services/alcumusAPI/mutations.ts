import { NewVariant, Variant } from "../../types";
import { APIEndpointBuilder } from "./types";

export const getMutations = (builder: APIEndpointBuilder) => ({
  createVariant: builder.mutation<Variant, NewVariant>({
    query: (body) => ({
      url: "/variant",
      method: "POST",
      body,
    }),
  }),
});
