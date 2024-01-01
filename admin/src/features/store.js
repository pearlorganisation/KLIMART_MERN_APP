import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authenticationSlices";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
// import { encryptTransform } from "redux-persist-transform-encrypt";

// ---------------------------------------------------------

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  //   transforms: [
  //     encryptTransform({
  //       secretKey: `${process.env.REACT_APP_REDUX_PERSIST_SECRET_KEY}`,
  //       onError: (err) => {
  //         console.log("Redux Persist Encryption Failed: ", err);
  //       },
  //     }),
  //   ],
  // if you do not want to persist this part of the state
  // blacklist: ["omitedPart"],
};

const reducer = combineReducers({
  authentication: authenticationReducer,

  // omitedPart: OmitReducer // not persisting this reducer
});

const rootReducer = (state, action) => {
  if (action.type === "authentication/clearReduxStoreData") {
    // console.log("Redux State Cleared");
    state = undefined;
    localStorage.clear();
    sessionStorage.clear();
  }
  return reducer(state, action);
};
// This ensures your redux state is saved to persisted storage whenever it changes
// we pass this to the store
const persistedReducer = persistReducer(persistConfig, rootReducer);

/*
"configureStore" creates a Redux store, and also automatically configure the Redux DevTools extension so that you can inspect the store while 
 developing.

Once the store is created, we can make it available to our React components by putting a React-Redux <Provider> 
around our application in src/index.js. Import the Redux store we just created, put a <Provider> around your <App>, 
and pass the store as a prop: 
*/

const store = configureStore({
  // Reducer when we don't want to use redux-persist.

  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

// ================================================== THE END ==================================================
