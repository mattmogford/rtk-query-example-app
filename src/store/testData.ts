import { RootState } from "./store";
import { NewServiceType, ServiceType } from "./types";

export const initialState: RootState = {
  auth: {
    isLoggedIn: false,
  },
  alcumusAPI: {
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
      reducerPath: "alcumusAPI",
      keepUnusedDataFor: 60,
    },
  },
};

export const newServiceType: NewServiceType = {
  name: "New Service Type",
  description: "New Service Type Description",
};

export const serviceType: ServiceType = {
  name: "ST1",
  description: "ST1 Description",
};
