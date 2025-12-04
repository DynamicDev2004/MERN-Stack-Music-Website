import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { updateRoot } from "../controllers/theme.controller";
import { googleLogout } from "@react-oauth/google";

import { showToast } from "../features/toastSlice.js";

const initialState = {
  isAuthenticated: false,
  user: null,
  userId: null,
  isAdmin: false,
  loading: true,
  error: null,
  processing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const user = action.payload;

      state.isAuthenticated = !!user;
      state.user = user;
      state.userId = user?._id || null;
     state.isAdmin =user.isAdmin;
    },
   
    logout: (state) => {
  
      state.isAuthenticated = false;
      state.user = null;
      state.userId = null;
         
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    getUser: (state, action) => {
      const user = action.payload;
      state.isAuthenticated = !!user;
      state.user = user.data;
      state.userId = user.data?._id || null;
     state.isAdmin =user.data.isAdmin;     

    },
    setProcessing: (state, action) => {
     state.processing = action.payload;
    },

  },
extraReducers: (builder) => {
  builder.addCase(updateUser.fulfilled, (state, action) => {
    state.user = { ...state.user, ...action.payload }; 
    state.user.userMetaData.theme  = action.payload.theme
  });

  builder.addCase(updateUser.rejected, (state, action) => {
    state.error = action.payload;
  });
}
});

export const fetchUser = () => async (dispatch) => {
  axios.defaults.withCredentials = true; 
  dispatch(setLoading(true));
  try {

    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/getUser`)
    dispatch(getUser(res.data)); 
    dispatch(updateRoot(res.data.data.userMetaData.theme || 0))

  } catch (error) {

    if (error.response?.status === 403 ){
      dispatch(logout());
    } 
    if (error.response?.status === 401 ){

  try {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/refreshToken`)
    dispatch(getUser(res.data)); 
    dispatch(updateRoot(res.data.data.userMetaData.theme || 0))

  } catch (error) {
    dispatch(logout());
  }
    } 
   
    else {
      dispatch(setError(error.response?.data || "Error fetching user"));
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export const loginUser = createAsyncThunk("auth/login",async(payload,thunk)=>{
  axios.defaults.withCredentials = true
  try {
    thunk.dispatch(setProcessing(true))
     const loginRequest = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`, payload);

if(loginRequest.status === 200) {

  thunk.dispatch(login(loginRequest.data.data))}
} catch (error) {
  thunk.rejectWithValue(error.response.data.message)
  console.log(error)
  if(error.status === 406 && error.response.data.message === "Wrong Password"){ 
    thunk.dispatch(showToast({
      type: 'error',
      heading: 'Login Failed',
      message: 'The password you entered is incorrect. Please try again.'
    }))
  }
  if(error.status === 405){ 
    thunk.dispatch(showToast({
      type: 'error',
      heading: 'Login Failed',
      message: error.response.data.message
    }))
  }
  if(error.status === 404 && error.response.data.message === "No User Found"){ 
   thunk.dispatch(showToast({
      type: 'error',
      heading: 'Login Failed',
      message: 'No user found with the provided credentials. Please sign up first.'
    })  
  )
  }
}finally{
      thunk.dispatch(setProcessing(false))
}
})

export const googleLogin = createAsyncThunk("auth/login",async(payload,thunk)=>{
  console.log(payload)
  try {
     const loginRequest = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/googleLogin?code=${payload.code}`)

if(loginRequest.status === 200) {

  thunk.dispatch(login(loginRequest.data.data))}
} catch (error) {
  thunk.rejectWithValue(error.response.data.message)
}
})

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/updateUser`,
        payload
      );
       if(res) thunkAPI.dispatch(showToast({
            type: 'success',
            heading: 'Profile Updated',
            message: 'Your profile has been updated successfully.'
          }))
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoout', async (payload, thunk)=>{
try {
 if(thunk.getState().auth.user.provider == "google"){
    googleLogout();
 }
  const logoutres = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/logout`);
  if(logoutres.status === 200) {

  thunk.dispatch(logout())
  }
} catch (error) {
  console.log(error)
}
})

export const { login, logout, setLoading, setError, getUser ,updateState, setProcessing } =
  authSlice.actions;

export default authSlice.reducer;
