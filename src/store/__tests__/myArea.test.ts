import { setupApiStore } from "../testUtils";
import { alcumusAPI } from "../services/alcumusAPI";
import myAreaReducer, { myAreaActions } from "../myArea";

const testSecret = "test-secret-123";

describe("MyArea actions", () => {
  test("setSecret", () => {
    const { store } = setupApiStore(alcumusAPI, { myArea: myAreaReducer });
    const stateBeforeAction = store.getState();
    store.dispatch(myAreaActions.setSecret({ secret: testSecret }));
    const stateAfterAction = store.getState();

    expect(stateBeforeAction.myArea.secret).toBe(undefined);

    expect(stateAfterAction.myArea.secret).toBe(testSecret);
  });
});
