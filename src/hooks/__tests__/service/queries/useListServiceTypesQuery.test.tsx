import { renderHook } from "@testing-library/react-hooks";
import { serviceType } from "../../../../store/testData";
import { useListServiceTypesQuery } from "../../../alcumusAPI";
import {
  TestHookWrapper,
  TEST_HOOK_UPDATE_TIMEOUT,
} from "../serviceTestSetup.test";

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe("useListServiceTypesQuery", () => {
  it("Success", async () => {
    fetchMock.mockResponse(JSON.stringify([serviceType]));
    const { result, waitForNextUpdate } = renderHook(
      () => useListServiceTypesQuery(undefined),
      { wrapper: TestHookWrapper }
    );
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);
    await waitForNextUpdate({ timeout: TEST_HOOK_UPDATE_TIMEOUT });

    const nextResponse = result.current;
    expect(nextResponse.data).not.toBeUndefined();
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isSuccess).toBe(true);
  });

  it("Internal Server Error", async () => {
    fetchMock.mockReject(new Error("Internal Server Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useListServiceTypesQuery(undefined),
      { wrapper: TestHookWrapper }
    );
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);

    await waitForNextUpdate({ timeout: TEST_HOOK_UPDATE_TIMEOUT });

    const nextResponse = result.current;
    expect(nextResponse.data).toBeUndefined();
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isError).toBe(true);
  });
});
