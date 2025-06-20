import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/reducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
