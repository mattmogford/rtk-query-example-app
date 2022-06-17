import React from "react";
import { Provider } from "react-redux";
import authReducer from "../../../store/auth";
import { alcumusAPI } from "../../../store/services/alcumusAPI";
import { setupApiStore } from "../../../store/testUtils";

export const TEST_HOOK_UPDATE_TIMEOUT = 5000;

export const TestHookWrapper: React.FC = ({ children }) => {
  const storeRef = setupApiStore(alcumusAPI, { auth: authReducer });
  return <Provider store={storeRef.store}>{children}</Provider>;
};

describe("serviceTestSetup", () => {
  it("Success", async () => {});
});
