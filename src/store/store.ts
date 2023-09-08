import createSagaMiddleware from '@redux-saga/core';
import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
  counter: counterReducer,
  auth: authReducer,
  users: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;
export default store;
