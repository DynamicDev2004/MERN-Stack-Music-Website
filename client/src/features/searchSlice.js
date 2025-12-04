import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchedResults :[]
}

const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        setSearchedData :(state, action)=>{
     
            state.searchedResults = action.payload
        }
    }
})

export const {setSearchedData} = SearchSlice.actions

export default SearchSlice.reducer