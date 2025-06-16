import axios from "axios";

const registerUser = async (credentials) => {
  try {
    const response = await axios.post("/register", credentials);
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data.error || error.message);
  }
};

const loginUser = async (credentials) => {
  try {
    const { data } = await axios.post("/login", credentials);
    //stores token in local storage to use for future requests
    return new Promise.resolve(data.user);
  } catch (error) {
    console.error(error.response.data.error || error.message);
  }
};

const checkAuth = async (token) => {
  try {
    const { data } = await axios.get("/check-auth", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return new Promise.resolve(data.user);
  } catch (error) {
    console.error(error.response.data.error || error.message);
    return new Promise.reject(error.response.data.error || error.message);
  }
};

const fetchAchievements = async (token) => {
  try {
    const { data } = await axios.get("/award", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return new Promise.resolve(data.awards);
  } catch (error) {
    console.error(error.response.data.error || error.message);
    return new Promise.reject(error.response.data.error || error.message);
  }
};

const updateProgress = async (token, id, type) => {
  try {
    const response = await axios.post(
      "/update-progress",
      { id, type },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.data);
    return new Promise.resolve(data);
  } catch (error) {
    console.error(error.response.data.error || error.message);
    return new Promise.reject(error.response.data.error || error.message);
  }
};

const shareVerse = async (token, receiverId) => {
  try {
    const response = await axios.post(
      `/share/${receiverId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.data);
    return new Promise.resolve(data);
  } catch (error) {
    console.error(error.response.data.error || error.message);
    return new Promise.reject(error.response.data.error || error.message);
  }
};

export {registerUser, loginUser, updateProgress, shareVerse, checkAuth, fetchAchievements}
