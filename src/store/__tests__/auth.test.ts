import { setupApiStore } from "../testUtils";
import { myAPIService } from "../service";
import authReducer, { authActions } from "../auth";

const testToken = "test-token-123";

jest.spyOn(window.localStorage.__proto__, "setItem");
window.localStorage.__proto__.setItem = jest.fn();

describe("Auth actions", () => {
  test("login", () => {
    const { store } = setupApiStore(myAPIService, { auth: authReducer });
    const stateBeforeAction = store.getState();
    store.dispatch(authActions.login({ token: testToken }));
    const stateAfterAction = store.getState();

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
