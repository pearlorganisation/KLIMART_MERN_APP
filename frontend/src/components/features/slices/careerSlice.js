import { createSlice } from "@reduxjs/toolkit";
import { fetchCareerList, getCareerPageData, getCurrentVacancies } from "../actions/careerActions";



const initialState = {
  contactData:[],
  currentVacanciesData:[],
    careerData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    currentVacanciesData:[],
  };



  export const careerSlice = createSlice({
    name:'career',
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
        .addCase(fetchCareerList.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;

          })
          .addCase(fetchCareerList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.contactData = action?.payload;
            state.isError = false;
          })
          .addCase(fetchCareerList.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
          })

          // getCareerPageData
          .addCase(getCareerPageData.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;

          })
          .addCase(getCareerPageData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.careerData = action?.payload;
            state.isError = false;
          })
          .addCase(getCareerPageData.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
          })
          .addCase(getCurrentVacancies.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;

          })
          .addCase(getCurrentVacancies.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true; 
            state.currentVacanciesData = action?.payload;
            state.isError = false;
          })
          .addCase(getCurrentVacancies.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
          })
    }
  })


  export const {clearReduxStoreData} = careerSlice.actions;
  export default careerSlice.reducer