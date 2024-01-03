import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contactReducer from "./slices/contactSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import careerReducer from "./slices/careerSlice";
import getTouchReducer from "./slices/getintouchSlice";
import getProjectReducer from "./slices/projectSlice"
import getBlogReducer from "./slices/blogSlice"
import aboutReducer from './slices/aboutSlice'
import homeReducer from "./slices/homeslice"


const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  contact: contactReducer,
  career:careerReducer,
  getTouch:getTouchReducer,
  getProject:getProjectReducer,
  getBlog:getBlogReducer,
  about:aboutReducer,
  home:homeReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
