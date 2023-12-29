import { createSlice } from "@reduxjs/toolkit";
import { fetchGetTouchForm } from "../actions/getintouchActions";



const initialState = {
    getTouchData: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
  };



  export const getTouchSlice = createSlice({
    name:'getTouch',
    initialState,
    reducers:{
        clearReduxStoreData: (state) => {
            localStorage.removeItem("persist:root");
            sessionStorage.clear();
            state.isLoading = false;
            state.isSuccess = false;
          },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchGetTouchForm.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;

          })
          .addCase(fetchGetTouchForm.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.contactData = action?.payload;
            state.isError = false;
          })
          .addCase(fetchGetTouchForm.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
          })
    }
  })


  export const {clearReduxStoreData} = getTouchSlice.actions;
  export default getTouchSlice.reducer