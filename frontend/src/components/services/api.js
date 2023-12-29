import axios from "axios";

export const instance = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
  baseURL: `${
    process.env.REACT_APP_WORKING_ENVIRONMENT === "production"
      ? process.env.REACT_APP_BASE_API_URL
      : process.env.REACT_APP_DEV_API_URL  
  }`,
});
