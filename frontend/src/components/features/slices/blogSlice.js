import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogs, fetchHomeBlog, fetchMainTag, fetchSingleBlogById, fetchSingleBlogs } from "../actions/blogAction";

const initialState = {
  getBlogData: [],
  filterBlog: [],
  singleBlogData: [],
  mainTags:[],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getBlogSlice = createSlice({
  name: "getBlog",
  initialState,
  reducers: {
    filterBlogByCategory: (state, action) => {
      const filterByCategory = state?.filterBlog?.filter(
        (item) => item.category === action.payload
      );
      // state.filterBlog = "";
    },

    filterBlogByTags: (state, action) => {
      console.log("running",action.payload)
      if (action.payload[0] !== "All" && action.payload.length !== 0) {
        const filteredData = state?.singleBlogData?.filter((item) => {
          // Check if any of the tags in filterTags array match the tags in the item
          return action.payload.some((filterTag) =>
            item.tags.some((itemTag) => itemTag.tags_name === filterTag)
          );
        });
        state.filterBlog = filteredData;
      } else {
        state.filterBlog = state.singleBlogData;          
      }
      // state.filterBlog = state.getBlogData;
    },
    clearReduxStoreData: (state) => {
      localStorage.removeItem("persist:root");
      sessionStorage.clear();
      state.isLoading = false;
      state.isSuccess = false;
    },

    // const filterData = state.getBlogData.map((item) => {
    //   console.log(item, "checking items inside redux");
    //   item.tags.map((value) => {
    //     return action.payload.includes(value.tags_name);
    //   });
    // });
    // console.log(filterData, "Hello inside redux method");
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.getBlogData = action.payload?.blog;
        state.filterBlog = action.payload?.blog;
        state.isError = false;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(fetchSingleBlogs.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchSingleBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleBlogData = action.payload;
        state.filterBlog = action.payload
        state.isError = false;
      })
      .addCase(fetchSingleBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      // fetch single blog by id
      .addCase(fetchSingleBlogById.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchSingleBlogById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleBlogData = action.payload;
        state.isError = false;
      })
      .addCase(fetchSingleBlogById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })

      .addCase(fetchMainTag.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchMainTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mainTags = action.payload;
        state.isError = false;
      })
      .addCase(fetchMainTag.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(fetchHomeBlog.pending,(state,action)=>{
        state.isLoading= true;
        state.isError=false;
    
    })
    .addCase(fetchHomeBlog.fulfilled, (state, action)=>{
        state.isLoading= false;
        state.isSuccess= false;
        state.HomeBlogData= action?.payload
    })
    .addCase(fetchHomeBlog.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
    })
  },
});

export const { clearReduxStoreData, filterBlogByTags, filterBlogByCategory } =
  getBlogSlice.actions;
export default getBlogSlice.reducer;
