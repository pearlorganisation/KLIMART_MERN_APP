import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/api";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchContactsList = createAsyncThunk(
    "contact/fetchContacts",
    async (payload, { rejectWithValue }) => {
      try {
        const { data } = await instance.post("/api/v1/contact", payload, {
          withCredentials: true,
        });
        toast.success("successfully submitted")
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const getBranchData = createAsyncThunk(
    "contact/getBranchData",
    async (payload, { rejectWithValue }) => {
      try {
        const { data } = await instance.get("/api/v1/branch", {
          withCredentials: false,
        });
        return data?.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const getHeadquaterData = createAsyncThunk(
    "contact/getHeadquaterData",
    async (payload, { rejectWithValue }) => {
      try {
        const { data } = await instance.get("/api/v1/headqaurter", {
          withCredentials: false,
        });
        return data?.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );