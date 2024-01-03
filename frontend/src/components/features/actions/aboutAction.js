import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/api";

export const getTeam = createAsyncThunk(
  "about/getTeam",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/api/v1/employee", {
        withCredentials: false,
      });
      return data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAboutData = createAsyncThunk(
  "aboutData",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/api/v1/aboutpage", {
        withCredentials: false,
      });
      return data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getValueProvidedData = createAsyncThunk(
  "aboutData/valueprovided",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/api/v1/valuesProvided", {
        withCredentials: false,
      });
      return data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchKlimart= createAsyncThunk(
  "homeSlice/klimart",
  async()=>{
      try{
          const {data}= await instance.get("api/v1/klimART");
          return data?.data;
      }
      catch(error){
          console.log(error)
      }
  }
)