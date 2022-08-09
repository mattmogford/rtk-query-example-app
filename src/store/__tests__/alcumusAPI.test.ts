import fetchMock from "jest-fetch-mock";
import authReducer, { authActions } from "../auth";
import { alcumusAPI, serviceURL } from "../services/alcumusAPI";
import { newServiceType, serviceType } from "../testData";
import { setupApiStore, SetupApiStoreReturnType } from "../testUtils";
import { Headers } from "../types";

const dispatch = (storeRef: SetupApiStoreReturnType, ...rest: any[]) =>
  (storeRef.store.dispatch as any)(...rest);

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe("ListServiceTypes", () => {
  const storeRef = setupApiStore(alcumusAPI, { auth: authReducer });
  fetchMock.mockResponse(JSON.stringify({}));

  test("request is correct", () => {
    return dispatch(
      storeRef,
      alcumusAPI.endpoints.listServiceTypes.initiate(undefined)
    ).then(() => {
      expect(fetchMock).toBeCalledTimes(1);
      const { method, headers, url } = fetchMock.mock.calls[0][0] as Request;

      const accept = headers.get(Headers.Accept);
      const authorization = headers.get(Headers.Authorization);

      expect(method).toBe("GET");
      expect(url).toBe(`${serviceURL}service-types`);
      expect(accept).toBe("application/json");
      expect(authorization).toBeNull();
    });
  });
  test("successful response", () => {
    const storeRef = setupApiStore<any, any>(alcumusAPI, { auth: authReducer });
    fetchMock.mockResponse(JSON.stringify([serviceType]));

    return dispatch(
      storeRef,
      alcumusAPI.endpoints.listServiceTypes.initiate(undefined)
    ).then((action: any) => {
      const { status, data, isSuccess } = action;
      expect(status).toBe("fulfilled");
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual([serviceType]);
    });
  });
  test("unsuccessful response", () => {
    const storeRef = setupApiStore(alcumusAPI, { auth: authReducer });
    fetchMock.mockReject(new Error("Internal Server Error"));

    return dispatch(
      storeRef,
      alcumusAPI.endpoints.listServiceTypes.initiate(undefined)
    ).then((action: any) => {
      const {
        status,
        error: { error },
        isError,
      } = action;
      expect(status).toBe("rejected");
      expect(isError).toBe(true);
      expect(error).toBe("Error: Internal Server Error");
    });
  });
});

describe("CreateServiceType", () => {
  test("request is correct", () => {
    const storeRef = setupApiStore(alcumusAPI, { auth: authReducer });
    const testToken = "test-123";
    dispatch(storeRef, authActions.login({ token: testToken }));
    fetchMock.mockResponse(JSON.stringify({}));
    return dispatch(
      storeRef,
      alcumusAPI.endpoints.createServiceType.initiate(newServiceType)
    ).then(() => {
      expect(fetchMock).toBeCalledTimes(1);
      const request = fetchMock.mock.calls[0][0] as Request;
      const { method, headers, url } = request;

      void request.json().then((data) => {
        expect(data).toStrictEqual(newServiceType);
      });

      const accept = headers.get(Headers.Accept);
      const authorization = headers.get(Headers.Authorization);

      expect(method).toBe("POST");
      expect(url).toBe(`${serviceURL}service-type`);
      expect(accept).toBe("application/json");
      expect(authorization).toBe(`Bearer ${testToken}`);
    });
  });
  test("successful response", () => {
    const storeRef = setupApiStore(alcumusAPI, { auth: authReducer });
    const testToken = "test-123";
    dispatch(storeRef, authActions.login({ token: testToken }));
    fetchMock.mockResponse(JSON.stringify(serviceType));

    return dispatch(
      storeRef,
      alcumusAPI.endpoints.createServiceType.initiate(newServiceType)
    ).then((action: any) => {
      const { data } = action;
      expect(data).toStrictEqual(serviceType);
    });
  });
  test("unsuccessful response", () => {
    const storeRef = setupApiStore(alcumusAPI, { auth: authReducer });
    fetchMock.mockReject(new Error("Internal Server Error"));

    return dispatch(
      storeRef,
      alcumusAPI.endpoints.listServiceTypes.initiate(undefined)
    ).then((action: any) => {
      const {
        status,
        error: { error },
        isError,
      } = action;
      expect(status).toBe("rejected");
      expect(isError).toBe(true);
      expect(error).toBe("Error: Internal Server Error");
    });
  });
});
