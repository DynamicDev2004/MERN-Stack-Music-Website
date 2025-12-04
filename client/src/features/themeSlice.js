import { createSlice } from "@reduxjs/toolkit"
import { ThemeOptions } from "../controllers/theme.controller"

const initialState = {
    theme: 1
}

const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        updateTheme:(state,action)=>{
            state.theme = action.payload
            console.log(":SLICE CALLED", state.theme)
        
        }
    }

})
export const {updateTheme} = themeSlice.actions
export default themeSlice.reducer
