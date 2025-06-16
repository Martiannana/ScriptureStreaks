import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CHECK_AUTH_REQUEST,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE,
  GET_ACHIEVEMENTS_REQUEST,
  GET_ACHIEVEMENTS_SUCCESS,
  GET_ACHIEVEMENTS_FAILURE,
  SET_LOADING,
} from "./types";

export const signupRequest = () => ({ type: SIGNUP_REQUEST });
export const signupSuccess = () => ({ type: SIGNUP_SUCCESS });
export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const requestCheckAuth = () => ({
  type: CHECK_AUTH_REQUEST,
});

export const checkAuthSuccess = (user) => ({
  type: CHECK_AUTH_SUCCESS,
  payload: user,
});

export const checkAuthFail = (error) => ({
  type: CHECK_AUTH_FAILURE,
  payload: error,
});

export const requestAchievement = () => ({
  type: GET_ACHIEVEMENTS_REQUEST,
});

export const getAchievementSuccess = (achievements) => ({
  type: GET_ACHIEVEMENTS_SUCCESS,
  payload: achievements,
});

export const getAchievementFailure = (error) => ({
  type: GET_ACHIEVEMENTS_FAILURE,
  payload: error,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const logout = () => ({ type: LOGOUT });
