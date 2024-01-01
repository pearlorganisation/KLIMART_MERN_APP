import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const fetchCareerList = createAsyncThunk(
  "career/fetchCareer",
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("cv", payload?.cv?.[0]);
      formData.append("document", JSON.stringify(payload));
      // console.log("Amit payload",payload)
      const { data } = await instance.post("/api/v1/career", formData, {
        withCredentials: true,
      });
      toast.success("submited successfully")
      return data;
    } catch (error) {
      toast.error(error)
      return rejectWithValue(error);
    }
  }
);

// get career data
export const getCareerPageData =  createAsyncThunk(
  "career/getCareerPageData",async(data,{rejectWithValue})=>{
    try {
      const { data } = await instance.get("/api/v1/careerpage", {
        withCredentials: false,
      });
      return data?.data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

// export const getCurrentVacancies =  createAsyncThunk(
//   "career/getCurrentVacancies",async(data,{rejectWithValue})=>{
//     try {
//       const { data } = await instance.get("/api/v1/currentVacancies", {
//         withCredentials: false,
//       });
//       return data?.data
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// )

export const getCurrentVacancies= createAsyncThunk(
  "homeSlice/getCurrentVacancies",
  async()=>{
      try{
          const {data}= await instance.get("api/v1/currentVacancies");
          return data;
      }
      catch(error){
          console.log(error)
      }
  }
)