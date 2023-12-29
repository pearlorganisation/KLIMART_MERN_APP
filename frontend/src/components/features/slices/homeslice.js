import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogs } from "../actions/blogAction";
import { fetchHomeData, fetchKlimart, fetchLogos } from "../actions/homeAction";


const initialState={
    isLoading:false,
    HomeData:[],
    logoData:[],
    isSuccess:false,
    isError:false,
 
    
}

export const homeSlice= createSlice({
    name:"homeSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchHomeData.pending,(state, action)=>{
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(fetchHomeData.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.HomeData = action?.payload
        })
        .addCase(fetchHomeData.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
        })
        .addCase(fetchLogos.pending,(state, action)=>{
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(fetchLogos.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.logoData = action?.payload
        })
        .addCase(fetchLogos.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
        })
       
       
    }
}
)

export default homeSlice.reducer;