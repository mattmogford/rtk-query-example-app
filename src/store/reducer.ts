import { combineReducers } from "redux";

import auth from "./auth";
import myArea from "./myArea";
import { alcumusAPI } from "./services/alcumusAPI";

export default combineReducers({
  auth,
  [alcumusAPI.reducerPath]: alcumusAPI.reducer,
  myArea,
});
