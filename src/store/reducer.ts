import { combineReducers } from "redux";

import auth from "./auth";
import myArea from "./myArea";
import { myAPIService } from "./service";

export default combineReducers({
  auth,
  [myAPIService.reducerPath]: myAPIService.reducer,
  myArea,
});
