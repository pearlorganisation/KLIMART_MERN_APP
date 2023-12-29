import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/api";

export const fetchProjects = createAsyncThunk(
  "getProjetc/fetchProjects",
  async () => {
    try {
      const { data } = await instance.get("api/v1/projects");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchSingleproject = createAsyncThunk(
  "getSingleProject/fetchSingleProject",
  async (id) => {
    try {
      const { data } = await instance.get(`api/v1/projects/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
