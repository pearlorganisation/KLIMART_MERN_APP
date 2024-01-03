import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ContextProviderProjects from "./features/ContextApi/ContextProviderProjects.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./features/store";
import { injectStore } from "./services/axiosInstance.js";
import 'react-confirm-alert/src/react-confirm-alert.css';


let persistor = persistStore(store);

injectStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <ContextProviderProjects>
    {/* <BrowserRouter basename="/mern/klimart-admin"> */}
    <BrowserRouter  
    //  basename={
    //     process.env.REACT_APP_WORKING_ENVIRONMENT === "production"
    //       ? "/mern/klimart-admin"
    //       : ""
    //   }
    // "homepage": "https://development.pearl-developer.com/mern/klimart-admin",
    >
      <Provider store={store}>
        {/* PersistGate delays the rendering of UI until the persisted state has been retrrieved and saved to redux */}
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </ContextProviderProjects>
);

