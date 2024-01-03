import { createSlice } from "@reduxjs/toolkit";
import { getTeam,getAboutData, getValueProvidedData, fetchKlimart} from "../actions/aboutAction";


const initialState = {
    isLoading: false,
    team:[],
    isSuccess: false,
    isError: false,
    aboutData:[],
    HomeBlogData:[],
    valueProvidedData:[],
    KlimartData:[],
  };

export const aboutSlice = createSlice({
name:'aboutSlice',
initialState,
reducers:{},
extraReducers:(builder)=>{
    builder
    .addCase(getTeam.pending,(state,action)=>{
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(getTeam.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = false;
        state.team = action?.payload
    })
    .addCase(getTeam.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
    })
    .addCase(getAboutData.pending,(state,action)=>{
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(getAboutData.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = false;
        state.aboutData = action?.payload
    })
    .addCase(getAboutData.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
    })
    .addCase(getValueProvidedData.pending,(state,action)=>{
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(getValueProvidedData.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = false;
        state.valueProvidedData = action?.payload
    })
    .addCase(getValueProvidedData.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
    })
    .addCase(fetchKlimart.pending,(state, action)=>{
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(fetchKlimart.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = false;
        state.KlimartData = action?.payload
    })
    .addCase(fetchKlimart.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
    })
   
}
})
    export default aboutSlice.reducer;