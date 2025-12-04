const initialState = {
    userLibSongs: [],
    historySongs: [],
    favouriteSongs: [],
    globalLibSongs: [],
    isLoading: false,
};

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHistory = createAsyncThunk(
  "songsData/history",
  async (_, {rejectWithValue}) => {

    try {
      const history = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/request/getHistory`);
     
      const processedHistory = history.data.data.map((item) => ({...item, visibility: 'history'}));

      return processedHistory;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const SongsData = createSlice({
  name: "songsData",
  initialState,
  reducers: {
    setUserLibSongs: (state, action) => {
      state.userLibSongs = action.payload;
    },
    setGlobalLibSongs: (state, action) => {
      state.globalLibSongs = action.payload;
    },
    setHistorySongs: (state, action) => {
      state.historySongs = action.payload;
    },
    clearSongsData: (state) => {
    state.userLibSongs= [],
    state.historySongs= [],
    state.globalLibSongs= []

    },
    setFavouriteSongs: (state, action) => {
      console.log("SETTING FAVOURITE SONGS IN REDUCER", action.payload)
      state.favouriteSongs = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.historySongs = action.payload;
        console.log("REDUCER",action.payload)
      })
      .addCase(fetchHistory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUserLibSongs,clearSongsData, setGlobalLibSongs, setHistorySongs, setFavouriteSongs } =
  SongsData.actions;

export default SongsData.reducer;
