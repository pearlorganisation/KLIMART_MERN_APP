import { createSlice } from "@reduxjs/toolkit";
import { fetchContactsList, getBranchData, getHeadquaterData } from "../actions/contactActions";



const initialState = {
    contactData: {},
    headquater:[],
    branches:[],
    isLoading: false,
    isSuccess: false,
    isError: false,
  };



  export const contactSlice = createSlice({
    name:'contact',
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
        .addCase(fetchContactsList.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;

          })
          .addCase(fetchContactsList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.contactData = action?.payload;
            state.isError = false;
          })
          .addCase(fetchContactsList.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
          })

          // get branch data
          .addCase(getBranchData.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;

          })
          .addCase(getBranchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.branches = action?.payload;
            state.isError = false;
          })
          .addCase(getBranchData.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
          })

          // get headquater data
          .addCase(getHeadquaterData.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;

          })
          .addCase(getHeadquaterData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.headquater = action?.payload;
            state.isError = false;
          })
          .addCase(getHeadquaterData.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
          })

        
    }
  })


  export const {clearReduxStoreData} = contactSlice.actions;
  export default contactSlice.reducer