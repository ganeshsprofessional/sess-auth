import * as apiUtil from "../utils/session";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
import { receiveErrors } from "./error";

const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user,
});
const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const login = (user) => async (dispatch) => {
  const response = await apiUtil.login(user);
  const data = await response.json();
  if (response.ok) {
    return dispatch(receiveCurrentUser(data));
  }
  // todo: handle errors
  return dispatch(receiveErrors(data));
};
export const signup = (user) => async (dispatch) => {
  const response = await apiUtil.signup(user);
  const data = await response.json();

  if (response.ok) {
    return dispatch(receiveCurrentUser(data));
  }
  // todo: handle errors
  return dispatch(receiveErrors(data));
};
export const logout = () => async (dispatch) => {
  const response = await apiUtil.logout();
  const data = await response.json();
  if (response.ok) {
    return dispatch(logoutCurrentUser());
  }
  // todo: handle errors
  return dispatch(receiveErrors(data));
};
