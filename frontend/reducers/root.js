import { combineReducers } from "redux";
import errors from "./error/error";
import session from "./session/session";
export default combineReducers({
  session,
  errors,
});
