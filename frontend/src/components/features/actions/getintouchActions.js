import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/api";
import { useForm } from "react-hook-form";

export const fetchGetTouchForm = createAsyncThunk(
    "getTouch/fetchGetTouch",
    async (payload, { rejectWithValue }) => {
      try {
        const { data } = await instance.post("/api/v1/getintouch", payload , {  withCredentials: true,});
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );