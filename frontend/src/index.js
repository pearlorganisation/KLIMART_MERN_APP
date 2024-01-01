import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./components/features/store";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter
  basename={
    process.env.REACT_APP_WORKING_ENVIRONMENT === "development"
      ? "/mern/klimart"
      : ""
  }
  //  "homepage": "https://development.pearl-developer.com/mern/klimart",
  
  >
    <ScrollToTop />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer autoClose={1500} />
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
