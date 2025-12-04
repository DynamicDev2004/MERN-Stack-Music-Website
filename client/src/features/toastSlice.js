import { createSlice } from "@reduxjs/toolkit"

const initialState  = {
    type : null,
    heading:null,
    message: null,
}

const toastSlice = createSlice({
   name: 'toast',
    initialState,
    reducers:{
        showToast: (state, action)=>{
            state.message = action.payload.message,
            state.heading = action.payload.heading,
            state.type = action.payload.type
        },
         hideToast: (state)=>{
            state.message = null,
            state.heading =null,
            state.type = null
        },

    }
})

export const {showToast, hideToast} = toastSlice.actions
export default toastSlice.reducer