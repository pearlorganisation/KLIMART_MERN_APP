// import axios from 'axios'
// // -------------------------------------------------------------------------

// export const instance = axios.create({
//     baseURL:"https://my-unifinders.onrender.com"
// })

import axios from "axios";
// -------------------------------------------------------------------------

// This code is used to access redux store in this file.
let store;
export const injectStore = (_store) => {
  store = _store;
};

// Creating new axios instance
export const instance = axios.create({
  baseURL: `${
    process.env.REACT_APP_WORKING_ENVIRONMENT === "production"
      ? process.env.REACT_APP_BASE_API_URL
      : process.env.REACT_APP_DEV_API_URL
  }`,
  //   baseURL: `${
  //     process.env.REACT_APP_WORKING_ENVIRONMENT === "development"
  //       ? process.env.REACT_APP_API_BASE_URL_DEVELOPMENT
  //       : process.env.REACT_APP_API_BASE_URL_PRODUCTION
  //   }/api/`,
  // baseURL: "http://localhost:8081/api/v1",
  // baseURL: "https://klimart-jl1e.onrender.com/api/v1",
  // baseURL: process.env.REACT_API_BASE_URL,
});

instance.interceptors.request.use(
  (request) => {
    console.log("Request data::: ", request);
    return request;
  },
  (error) => {
    // console.log("Request payload Error::: ", error);
    return Promise.reject(error);
  }
);
console.log(store, "Checking store data::::::::::::::::::");

instance.interceptors.response.use(
  (response) => {
    console.log("Response data::: ", response);
    return response;
  },
  async (error) => {
    // Token Expired Error Handling
    console.log(store.getState().authentication);
    const loggedInUserEmail = store?.getState()?.authentication
      ?.loggedInUserData?.userDetails?.email
      ? store?.getState()?.authentication?.loggedInUserData?.userDetails?.email
      : "";
    console.log(loggedInUserEmail, "CHecking interceptor");
    let errorMessage = "";

    const originalRequest = error.config;
    if (
      error.response.status === 401 ||
      error.response.status === 403 ||
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        if (loggedInUserEmail) {
          originalRequest._retry = true;
          console.log("checking inside interceptor ");
          await instance.post(
            "/auth/refreshToken",
            { email: loggedInUserEmail },
            {
              withCredentials: true,
            }
          );
          errorMessage = error.response.data.msg || "Unauthorized Access";
          return instance(originalRequest);
        } else return;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    switch (Number(error.response.status)) {
      case 400:
        errorMessage = error.response.data.msg || "Bad Request";
        break;

      case 404:
        errorMessage = error.response.data.msg || "Resource Not Found";
        break;

      case 500:
        errorMessage = error.response.data.msg || "Internal Server Error";
        break;

      default:
        errorMessage =
          error.response.data.msg ||
          "Sorry, something went wrong. Please try again later.";
    }
    return Promise.reject(errorMessage);
  }
);

// ================================================== THE END ==================================================
