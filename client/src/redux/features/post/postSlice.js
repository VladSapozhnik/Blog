import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
};

export const createPost = createAsyncThunk(
  "post/createPost",
  async (params) => {
    try {
      const { data } = await axios.post("/posts", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPost = createAsyncThunk("post/getAllPost", async () => {
  try {
    const { data } = await axios.get("/posts");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removePost = createAsyncThunk("post/removePost", async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`, id);

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updatePost = createAsyncThunk("post/updatePost", async (updatedPost) => {
  try {
    const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost);

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //createPost
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state) => {
        state.isLoading = false;
      })

      //Get Posts
      .addCase(getAllPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
        state.popularPosts = action.payload.popularPosts;
      })
      .addCase(getAllPost.rejected, (state) => {
        state.isLoading = false;
      })

      //remove post
      .addCase(removePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter(post => post._id !== action.payload._id);
      })
      .addCase(removePost.rejected, (state) => {
        state.isLoading = false;
      })

       //update post
       .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.posts.findIndex(post => post._id === action.payload._id);
        state.posts[index] = action.payload;
      })
      .addCase(updatePost.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export default postSlice.reducer;
