import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/api";

export const fetchBlogs = createAsyncThunk(
  "getBlog/fetchBlogs",
  async () => {
    try {
      const { data } = await instance.get("api/v1/blog");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchSingleBlogs = createAsyncThunk(
  "getSingleBlog/fetchSingleBlog",
  async (id) => {
    try {
      const { data } = await instance.get(`api/v1/blog/blog?mainTags=${id}`);
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchSingleBlogById = createAsyncThunk(
  "getSingleBlog/fetchSingleBlogById",
  async (id) => {
    try {
      const { data } = await instance.get(`api/v1/blog/${id}`);
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
)

export const fetchMainTag = createAsyncThunk(
  "blog/fetchMainTag",
  async (id) => {
    try {
      const { data } = await instance.get(`api/v1/mainTag`);
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchHomeBlog= createAsyncThunk(
  "blog/fetchHomeBlog",
  async ()=>{
    try{
      const data= await instance.get('api/v1/blogpage');
      return data?.data;
    
    }
    catch(error){
      console.log(error)
    }
  }
)
