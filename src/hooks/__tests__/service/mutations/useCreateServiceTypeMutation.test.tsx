import { renderHook } from "@testing-library/react-hooks";
import {
  TestHookWrapper,
  TEST_HOOK_UPDATE_TIMEOUT,
} from "../serviceTestSetup.test";

import { act } from "@testing-library/react-hooks";
import { newServiceType, serviceType } from "../../../../store/testData";
import { useCreateServiceTypeMutation } from "../../../alcumusAPI";

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe("useCreateServiceTypeMutation", () => {
  it("Success", async () => {
    fetchMock.mockResponse(JSON.stringify(serviceType));
    const { result, waitForNextUpdate } = renderHook(
      () => useCreateServiceTypeMutation(undefined),
      {
        wrapper: TestHookWrapper,
      }
    );
    const [createServiceType, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void createServiceType(newServiceType);
    });

    const loadingResponse = result.current[1];
    expect(loadingResponse.data).toBeUndefined();
    expect(loadingResponse.isLoading).toBe(true);

    await waitForNextUpdate({ timeout: TEST_HOOK_UPDATE_TIMEOUT });

    const loadedResponse = result.current[1];
    expect(loadedResponse.data).not.toBeUndefined();
    expect(loadedResponse.isLoading).toBe(false);
    expect(loadedResponse.isSuccess).toBe(true);
  });

  it("Internal Server Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useCreateServiceTypeMutation(undefined),
      {
        wrapper: TestHookWrapper,
      }
    );
    const [createServiceType, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void createServiceType(newServiceType);
    });

    const loadingResponse = result.current[1];
    expect(loadingResponse.data).toBeUndefined();
    expect(loadingResponse.isLoading).toBe(true);

    await waitForNextUpdate({ timeout: TEST_HOOK_UPDATE_TIMEOUT });

    const loadedResponse = result.current[1];
    expect(loadedResponse.data).toBeUndefined();
    expect(loadedResponse.isLoading).toBe(false);
    expect(loadedResponse.isError).toBe(true);
  });
});
