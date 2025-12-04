import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';
import themeSlice from '../features/themeSlice';
import toast from '../features/toastSlice.js';
import song  from '../features/songSlice.js';
import songsData  from '../features/songsDataSlice.js';
import songMiddleware from '../middleware/currentSong.middlewarelistener.js';
import searchData from '../features/searchSlice.js'
const store = configureStore({
  reducer: { auth: authSlice, theme: themeSlice, toast: toast, song: song, songsData: songsData, searchData: searchData},
middleware: (getDefaultMiddleware)=>
  getDefaultMiddleware().prepend(songMiddleware.middleware)

});

export default store;   