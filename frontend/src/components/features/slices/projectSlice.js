import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects, fetchSingleproject } from "../actions/projectAction";

const initialState = {
  getProjectData: [],
  filterProjectState: [],
  singleData: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getProjectSlice = createSlice({
  name: "getProject",
  initialState,
  reducers: {
    filterProjectsbyType: (state, action) => {
      if (action.payload.comesFrom === "Types") {
        const filterProjects = state.getProjectData.filter(
          (item) => item.type.type_name === action.payload.typeName
        );
        state.filterProjectState = filterProjects;
      } else {
        state.filterProjectState = state.getProjectData;
      }
    },
    clearReduxStoreData: (state) => {
      localStorage.removeItem("persist:root");
      sessionStorage.clear();
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.getProjectData = action.payload?.Project;
        state.filterProjectState = action.payload?.Project;
        state.isError = false;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(fetchSingleproject.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchSingleproject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleData = action.payload;
        state.isError = false;
      })
      .addCase(fetchSingleproject.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export const { clearReduxStoreData, filterProjectsbyType } =
  getProjectSlice.actions;
export default getProjectSlice.reducer;
