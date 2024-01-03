/* 
Creating a slice requires a string name to identify the slice, an initial state value, and one
or more reducer functions to define how the state can be updated. Once a slice is created, we can
export the generated Redux action creators and the reducer function for the whole slice.

Redux requires that we write all state updates immutably, by making copies of data and updating the copies. However,
Redux Toolkit's createSlice and createReducer APIs use Immer inside to allow us to write "mutating" update logic that
becomes correct immutable updates.
*/
// ==================================================================================================
import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  signUp,
  generateOtp,
  verifyOtp,
  updatePassword,
  logout,
} from "../actions/authenticationActions";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------------------------------------

const initialState = {
  loggedInUserData: {},
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  isUserLoggedIn: false,
  isOtpVerified: false,
  logoutSuccessMessage: "",
  isOtpGenerated: "",
  isPasswordChanged: "",
  // googleLoggedInUserDetails: {},
  // isGoogleApiCalled: false,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    // showLoginSuccessToast: (state) => {
    //   state.isUserLoggedIn = true;
    // },

    clearSendVerifyOtpData: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.isOtpVerified = false;
      state.isPasswordChanged = false;
    },

    clearReduxStoreData: (state) => {
      localStorage.removeItem("persist:root");
      sessionStorage.clear();
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.isOtpVerified = false;
      state.logoutSuccessMessage = "";
      state.isUserLoggedIn = false;
      state.loggedInUserData = {};
      state.isPasswordChanged = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // SignUp Cases
      // .addCase(signUp.pending, (state, action) => {
      //   state.isLoading = true;
      //   state.isSuccess = false;
      //   state.errorMessage = "";
      // })
      // .addCase(signUp.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.errorMessage = "";
      // })
      // .addCase(signUp.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = false;
      //   state.errorMessage = action.payload;
      // })
      // // Login Cases
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
        state.loggedInUserData = {};
        state.isUserLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.loggedInUserData = action.payload || {};
        state.isUserLoggedIn = true;
        state.logoutSuccessMessage = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.loggedInUserData = {};
        state.isUserLoggedIn = false;
      })
      // // Logout Cases
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
        state.logoutSuccessMessage = "";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.isOtpVerified = false;
        state.isOtpGenerated = false;
        state.logoutSuccessMessage = action.payload?.msg;
        // toast.success("Successfully Logout", {
        //   position: "bottom-center",
        // });
        state.isUserLoggedIn = false;
        state.loggedInUserData = {};
        localStorage.clear();
        sessionStorage.clear();
        // Cookies.clear()
        // retrieve all cookies
        let Cookies = document.cookie.split(";");
        // set past expiry to all cookies
        for (let i = 0; i < Cookies.length; i++) {
          document.cookie =
            Cookies[i] + "=; expires=" + new Date(0).toUTCString();
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.logoutSuccessMessage = "";
      })

      // OTPGeneration

      .addCase(generateOtp.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
        state.isOtpGenerated = false;
      })
      .addCase(generateOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.isOtpGenerated = true;
      })
      .addCase(generateOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.isOtpGenerated = false;
      })

      // Verify OTP Cases
      .addCase(verifyOtp.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
        state.isOtpVerified = false;
        state.isOtpGenerated = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.isOtpVerified = true;
        state.isOtpGenerated = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.isOtpVerified = false;
        state.isOtpGenerated = false;
      })

      // Update Password  Cases
      .addCase(updatePassword.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
        state.isPasswordChanged = false;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.isPasswordChanged = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.isPasswordChanged = false;
      });
    // .addCase(getGoogleLoggedInUserDetails.pending, (state, action) => {
    //   state.isLoading = true;
    //   state.isSuccess = false;
    //   state.errorMessage = "";
    //   state.isUserLoggedIn = false;
    //   state.googleLoggedInUserDetails = {};
    //   state.isGoogleApiCalled = true;
    // })
    // .addCase(getGoogleLoggedInUserDetails.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.errorMessage = "";
    //   state.googleLoggedInUserDetails = action.payload || {};
    //   state.isUserLoggedIn = true;
    // })
    // .addCase(getGoogleLoggedInUserDetails.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = false;
    //   state.errorMessage = action.payload;
    //   state.isUserLoggedIn = false;
    //   state.googleLoggedInUserDetails = {};
    // })
    // // Google Logout Cases
    // .addCase(logoutFromGoogle.pending, (state, action) => {
    //   state.isLoading = true;
    //   state.isSuccess = false;
    //   state.errorMessage = "";
    // })
    // .addCase(logoutFromGoogle.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.errorMessage = "";
    //   state.isOtpVerified = false;
    //   state.logoutSuccessMessage = action.payload?.msg;
    //   toast.success("Successfully Logout", {
    //     position: "bottom-center",
    //   });
    //   localStorage.clear();
    //   sessionStorage.clear();
    //   // retrieve all cookies
    //   let Cookies = document.cookie.split(";");
    //   // set past expiry to all cookies
    //   for (let i = 0; i < Cookies.length; i++) {
    //     document.cookie =
    //       Cookies[i] + "=; expires=" + new Date(0).toUTCString();
    //   }
    // })
    // .addCase(logoutFromGoogle.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = false;
    //   state.errorMessage = action.payload;
    // });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {
  userLogout,
  showLoginSuccessToast,
  clearSendVerifyOtpData,
  showLogoutSuccessToast,
  clearReduxStoreData,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;

/*
Next, we need to import the reducer function from the authentication slice and add it to our store. 
By defining a field inside the reducer parameter, we tell the store to use this slice reducer 
function to handle all updates to that state.
*/

// ================================================== THE END ==================================================
