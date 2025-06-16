import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  signupRequest,
  signupSuccess,
  signupFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  checkAuthSuccess,
  checkAuthFail,
  getAchievementSuccess,
  requestAchievement,
  getAchievementFailure,
  setLoading,
} from "./action";

export const signup = (userData) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    await axios.post("/auth/register", userData);
    dispatch(signupSuccess());
  } catch (error) {
    const message = error.response?.data?.message || "Signup failed";
    dispatch(signupFailure(message));
  }
};

export const login = (credentials) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const { data } = await axios.post("/auth/login", credentials);
    await AsyncStorage.setItem("userToken", data.token);
    dispatch(loginSuccess(data.user));
  } catch (error) {
    const message = error.response?.data?.error || "Login failed";
    dispatch(loginFailure(message));
  }
};

export const checkAuth = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get("/auth/check-auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(checkAuthSuccess(data.user));
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || "Not Authenticated";
    dispatch(checkAuthFail(message));
  }
};

export const getAchievements = (token) => async (dispatch) => {
  dispatch(requestAchievement);
  try {
    const { data } = await axios.get("/award", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getAchievementSuccess(data.awards));
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || "Not Authenticated";
    dispatch(getAchievementFailure(message));
  }
};

export const performLogout = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("userToken"); // Clear token
    dispatch(logout()); // Reset auth state
  } catch (error) {
    console.error("Logout failed", error);
  }
};



//call this function when you want to update the number of book, chapters or verses the user has read.
/**
 * type is either book, chapter or verse
 * Generate unique ids for the progress(book, chapter or verse).
 * For book use the book name. For instance, ${book}
 * For chapter, combine the book name and the chapter.For instance, ${book}-${chapter}
 * For verse, combine the book name, chapter and verse. For instance, ${book}-${chapter}-${verse}
 * **/
export const updateProgress = (token, id, type) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    await axios.post(
      "/auth/update-progress",
      { id, type },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    const message = error.response?.data?.error || "Login failed";
    dispatch(loginFailure(message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const shareVerse = (token, receiverId) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    await axios.post(
      `/auth/share/${receiverId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    const message = error.response?.data?.error || "Login failed";
    dispatch(loginFailure(message));
  } finally {
    dispatch(setLoading(false));
  }
};
