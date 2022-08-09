// See: https://mswjs.io/docs/getting-started/mocks/rest-api
import { rest } from "msw";
import createServiceTypeSuccess from "./responses/createServiceTypeSuccess.json";
import serviceTypesSuccess from "./responses/serviceTypesSuccess.json";
import { serviceURL } from "../store/services/alcumusAPI";

const serviceTypesUrl = `${serviceURL}service-types`;
const createServiceTypeUrl = `${serviceURL}service-type`;

const internalServerError = (req, res, ctx) => {
  return res(ctx.status(500), ctx.delay(mockServiceLatency));
};

// Edit this to increase or decrease latency
const mockServiceLatency = 2000;

const resolvers = {
  createServiceType: {
    success: (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(mockServiceLatency),
        ctx.json(createServiceTypeSuccess)
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
  createServiceType: {
    success: rest.post(
      createServiceTypeUrl,
      resolvers.createServiceType.success
    ),
    internalServerError: rest.post(createServiceTypeUrl, internalServerError),
  },
  serviceTypes: {
    success: rest.get(serviceTypesUrl, resolvers.serviceTypes.success),
    internalServerError: rest.get(serviceTypesUrl, internalServerError),
  },
};

export const handlersList = [
  // Comment out these two lines to cause service to return error
  handlers.createServiceType.success,
  handlers.serviceTypes.success,

  handlers.createServiceType.internalServerError,
  handlers.serviceTypes.internalServerError,
];
