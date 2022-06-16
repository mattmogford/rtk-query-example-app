import { renderHook } from "@testing-library/react-hooks";
import {
  TestHookWrapper,
  TEST_HOOK_UPDATE_TIMEOUT,
} from "../serviceTestSetup.test";

import { act } from "@testing-library/react-hooks";
import { variant, newVariant } from "../../../../store/testData";
import { useCreateVariantMutation } from "../../../service";

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe("useCreateVariantMutation", () => {
  it("Success", async () => {
    fetchMock.mockResponse(JSON.stringify(variant));
    const { result, waitForNextUpdate } = renderHook(
      () => useCreateVariantMutation(undefined),
      {
        wrapper: TestHookWrapper,
      }
    );
    const [createVariant, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void createVariant(newVariant);
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
      () => useCreateVariantMutation(undefined),
      {
        wrapper: TestHookWrapper,
      }
    );
    const [createVariant, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void createVariant(newVariant);
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
