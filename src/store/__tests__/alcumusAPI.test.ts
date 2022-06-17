import fetchMock from "jest-fetch-mock";
import { alcumusAPI, serviceURL } from "../services/alcumusAPI";
import { Headers } from "../types";
import { variant, serviceType, newVariant } from "../testData";
import authReducer from "../auth";
import { setupApiStore } from "../testUtils";
import { authActions } from "../auth";

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe("ListServiceTypes", () => {
  const storeRef = setupApiStore(alcumusAPI, { auth: authReducer });
  fetchMock.mockResponse(JSON.stringify({}));

  test("request is correct", () => {
    return storeRef.store
      .dispatch(alcumusAPI.endpoints.listServiceTypes.initiate(undefined))
      .then(() => {
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
    const storeRef = setupApiStore(alcumusAPI, { auth: authReducer });
    fetchMock.mockResponse(JSON.stringify([variant]));

    return storeRef.store
      .dispatch<any>(alcumusAPI.endpoints.listServiceTypes.initiate(undefined))
      .then((action: any) => {
        const { status, data, isSuccess } = action;
        expect(status).toBe("fulfilled");
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual([variant]);
      });
  });
  test("unsuccessful response", () => {
    const storeRef = setupApiStore(alcumusAPI, { auth: authReducer });
    fetchMock.mockReject(new Error("Internal Server Error"));

    return storeRef.store
      .dispatch<any>(alcumusAPI.endpoints.listServiceTypes.initiate(undefined))
      .then((action: any) => {
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

describe("CreateVariant", () => {
  test("request is correct", () => {
    const storeRef = setupApiStore(alcumusAPI, { auth: authReducer });
    const testToken = "test-123";
    storeRef.store.dispatch(authActions.login({ token: testToken }));
    fetchMock.mockResponse(JSON.stringify({}));
    return storeRef.store
      .dispatch<any>(alcumusAPI.endpoints.createVariant.initiate(newVariant))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0] as Request;
        const { method, headers, url } = request;

        void request.json().then((data) => {
          expect(data).toStrictEqual(newVariant);
        });

        const accept = headers.get(Headers.Accept);
        const authorization = headers.get(Headers.Authorization);

        expect(method).toBe("POST");
        expect(url).toBe(`${serviceURL}variant`);
        expect(accept).toBe("application/json");
        expect(authorization).toBe(`Bearer ${testToken}`);
      });
  });
  test("successful response", () => {
    const storeRef = setupApiStore(alcumusAPI, { auth: authReducer });
    const testToken = "test-123";
    storeRef.store.dispatch(authActions.login({ token: testToken }));
    fetchMock.mockResponse(JSON.stringify(variant));

    return storeRef.store
      .dispatch<any>(alcumusAPI.endpoints.createVariant.initiate(newVariant))
      .then((action: any) => {
        const { data } = action;
        expect(data).toStrictEqual(variant);
      });
  });
  test("unsuccessful response", () => {
    const storeRef = setupApiStore(alcumusAPI, { auth: authReducer });
    fetchMock.mockReject(new Error("Internal Server Error"));

    return storeRef.store
      .dispatch<any>(alcumusAPI.endpoints.listServiceTypes.initiate(undefined))
      .then((action: any) => {
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
