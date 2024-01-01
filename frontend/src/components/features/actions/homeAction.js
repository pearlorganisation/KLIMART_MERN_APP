import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/api";

export const fetchHomeData= createAsyncThunk(
    "getHome/fetchHomeData",
    async()=>{
        try{
            const {data}= await instance.get("api/v1/homepage");
            return data;
        }
        catch(error){
            console.log(error)
        }
    }
)
export const fetchLogos= createAsyncThunk(
    "homeSlice/fetchlogos",
    async()=>{
        try{
            const {data}= await instance.get("api/v1/clientelle");
            return data;
        }
        catch(error){
            console.log(error)
        }
    }
)
