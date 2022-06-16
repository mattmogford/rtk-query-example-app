import { renderHook } from "@testing-library/react-hooks";
import { variant } from "../../../../store/testData";
import { useListServiceTypesQuery } from "../../../service";
import {
  TestHookWrapper,
  TEST_HOOK_UPDATE_TIMEOUT,
} from "../serviceTestSetup.test";

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe("useListVariantsQuery", () => {
  it("Success", async () => {
    fetchMock.mockResponse(JSON.stringify([variant]));
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
