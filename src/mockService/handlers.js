// See: https://mswjs.io/docs/getting-started/mocks/rest-api
import { rest } from "msw";
import createVariantSuccess from "./responses/createVariantSuccess.json";
import serviceTypesSuccess from "./responses/serviceTypesSuccess.json";
import { serviceURL } from "../store/services/alcumusAPI";

const serviceTypesUrl = `${serviceURL}service-types`;
const createVariantUrl = `${serviceURL}variant`;

const internalServerError = (req, res, ctx) => {
  return res(ctx.status(500), ctx.delay(mockServiceLatency));
};

// Edit this to increase or decrease latency
const mockServiceLatency = 2000;

const resolvers = {
  createVariant: {
    success: (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(mockServiceLatency),
        ctx.json(createVariantSuccess)
      );
    },
  },
  serviceTypes: {
    success: (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(mockServiceLatency),
        ctx.json(serviceTypesSuccess)
      );
    },
  },
};

export const handlers = {
  createVariant: {
    success: rest.post(createVariantUrl, resolvers.createVariant.success),
    internalServerError: rest.post(createVariantUrl, internalServerError),
  },
  serviceTypes: {
    success: rest.get(serviceTypesUrl, resolvers.serviceTypes.success),
    internalServerError: rest.get(serviceTypesUrl, internalServerError),
  },
};

export const handlersList = [
  // Comment out these two lines to cause service to return error
  handlers.createVariant.success,
  handlers.serviceTypes.success,

  handlers.createVariant.internalServerError,
  handlers.serviceTypes.internalServerError,
];
