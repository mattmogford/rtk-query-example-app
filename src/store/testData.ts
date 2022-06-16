import { RootState } from "./store";
import { NewVariant, ServiceType, Variant } from "./types";

export const initialState: RootState = {
  auth: {
    isLoggedIn: false,
  },
  myAPIService: {
    queries: {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
      online: true,
      focused: true,
      middlewareRegistered: false,
      reducerPath: "myAPIService",
      keepUnusedDataFor: 60,
    },
  },
  myArea: {
    secret: undefined,
  },
};

export const newVariant: NewVariant = {
  name: "Variant",
  description: "Description",
  private: false,
  variant: "Classical",
};

export const variant: Variant = {
  ...newVariant,
  finished: false,
  id: "",
  started: false,
  createdAt: "",
  startedAt: "",
  finishedAt: "",
};

export const serviceType: ServiceType = {
  name: "Classical",
  createdBy: "Player",
  description: "Description",
  orderTypes: [],
};
