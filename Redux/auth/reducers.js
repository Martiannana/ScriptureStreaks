import {SIGNUP_REQUEST,  SIGNUP_SUCCESS,  SIGNUP_FAILURE,  LOGIN_REQUEST,  LOGIN_SUCCESS,  LOGIN_FAILURE,  LOGOUT,  CHECK_AUTH_REQUEST,  CHECK_AUTH_FAILURE,  CHECK_AUTH_SUCCESS,  GET_ACHIEVEMENTS_FAILURE,  GET_ACHIEVEMENTS_SUCCESS,  GET_ACHIEVEMENTS_REQUEST,  SET_LOADING,} from "./types";

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: true,
  error: null,
  awards: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        loading: false,
        error: action.payload,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        loading: false,
        error: action.payload,
      };
    case CHECK_AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CHECK_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        loading: false,
        error: null,
      };
    case CHECK_AUTH_FAILURE:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        loading: false,
        error: action.payload,
      };
    case GET_ACHIEVEMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ACHIEVEMENTS_SUCCESS:
      return {
        ...state,
        awards: action.payload,
        isLoggedIn: true,
        loading: false,
        error: null,
      };
    case GET_ACHIEVEMENTS_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        loading: false,
        error: null,
      };
    case SET_LOADING: 
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
  }
};

export default authReducer;
