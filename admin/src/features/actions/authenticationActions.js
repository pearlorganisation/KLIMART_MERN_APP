import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { instance } from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// -------------------------------------------------------------------------

// This method is used for Login
export const login = createAsyncThunk(
  "authentication/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/auth/login", payload, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success("Login Successfull", {
          autoClose: 500,
        });
        return data;
      } else {
        // toast.error("UserName or Password is incorrect", {
        //   position: "top-center",
        //   autoClose:500
        // });
        return data.message;
      }
    } catch (error) {
      toast.error("UserName or Password is incorrect");
      return rejectWithValue(error);
    }
  }
);
// -------------------------------------------------------------------------------------

// This method is used for New User Registration
export const signUp = createAsyncThunk(
  "authentication/signUp",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/auth/register", payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// -------------------------------------------------------------------------------------

// This method is used for generate otp to reset password
export const generateOtp = createAsyncThunk(
  "authentication/sendotp",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/auth/sendotp", payload, {
        withCredentials: true,
      });
      if (data.status) {
        toast.success("Otp sent to your email");
        return data;
      }
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

// -------------------------------------------------------------------------------------

// This method is used for verify otp to reset password
export const verifyOtp = createAsyncThunk(
  "authentication/verifyOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/auth/verifyOtp", payload, {
        withCredentials: true,
      });
      if (data.status) {
        toast.success("Opt verified, now you can change your password");
        return data;
      }
      // return data;
    } catch (error) {
      toast.error("Otp not matched");
      return rejectWithValue(error);
    }
  }
);

// -------------------------------------------------------------------------------------

// This method is used for update login Password
export const updatePassword = createAsyncThunk(
  "authentication/forgotPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.put("/auth/resetpassword", payload, {
        withCredentials: true,
      });
      // console.log(data,"Checking data in Update password::::::::::::::::::::")
      if (data.success) {
        toast.success("Password Changed successfully Please Login");

        return data;
      }
      // console.log(data, "Hello upadte password::::::::::::::: ");
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

// This method is used to logout the user.
export const logout = createAsyncThunk(
  "authentication/logout",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/auth/logout", payload, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success("Logout successfull", {
          autoClose: 500,
        });
        return data;
      }
      // Cookies.remove('accessToken');
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// This method is used for get Google Loginned User Details after successful login
// export const getGoogleLoggedInUserDetails = createAsyncThunk(
//   "authentication/getGoogleLoggedInUserDetails",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const { data } = await instance.post(
//         "auth/google/login/success",
//         payload,
//         {
//           withCredentials: true,
//         }
//       );
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// This method is used to logout the user from the Google.
// export const logoutFromGoogle = createAsyncThunk(
//   "authentication/logoutFromGoogle",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const { data } = await instance.get("auth/google/logout", payload, {
//         withCredentials: true,
//       });
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// ================================================== THE END ==================================================
