import authReducer, { authActions } from "../auth";
import { alcumusAPI } from "../services/alcumusAPI";
import { setupApiStore, SetupApiStoreReturnType } from "../testUtils";

const testToken = "test-token-123";

jest.spyOn(window.localStorage.__proto__, "setItem");
window.localStorage.__proto__.setItem = jest.fn();

const dispatch = (storeRef: SetupApiStoreReturnType, ...rest: any[]) =>
  (storeRef.store.dispatch as any)(...rest);

describe("Auth actions", () => {
  test("login", () => {
    const storeRef = setupApiStore(alcumusAPI, { auth: authReducer });
    const stateBeforeAction = storeRef.store.getState();

    dispatch(storeRef, authActions.login({ token: testToken }));

    const stateAfterAction = storeRef.store.getState();

    expect(stateBeforeAction.auth.token).toBe(undefined);
    expect(stateBeforeAction.auth.isLoggedIn).toBe(false);

    expect(stateAfterAction.auth.token).toBe(testToken);
    expect(stateAfterAction.auth.isLoggedIn).toBe(true);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "token",
      testToken
    );
  });
});
