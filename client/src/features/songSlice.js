import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { set } from "lodash";


const initialState = {
    currentSong: null,
    isPlaying: false,
    playlist: [],
    currentIndex: 0,
    volume: 1, 
    loop: false, 
    isMinimized: false,  
    showQueue: false,   
    isLoading: false,
    waveContainer: null,
    showMiniplayer: false,
}

export const Song = createSlice({
    name: "song",
    initialState,
    reducers: {
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
            console.log("SET CURRENT SONG",action.payload)
        },
        clearActiveSongData: (state) => {
    state.currentSong= null,
    state.isPlaying= false,
    state.playlist= [],
    state.currentIndex= 0,
    state.volume= 1, 
    state.loop= false, 
    state.isMinimized= false,  
    state.showQueue= true,   
    state.isLoading= false,
    state.waveContainer= null,
    state.showMiniplayer= false
        },
        setIsPlaying: (state, action) => {
                console.log("SET IS PLAYING",action.payload)    
            state.isPlaying = action.payload;
        },
        setPlaylist: (state, action) => {
            state.playlist = action.payload;
            console.log("STORE",action.payload)
        },
        setCurrentIndex: (state, action) => {
            state.currentIndex = action.payload;
           
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
        setLoop: (state, action) => {
            
            state.loop = action.payload;
        },
        setIsMinimized: (state, action) => {
            state.isMinimized = action.payload;
        },
        setShowQueue: (state, action) => {
            state.showQueue = action.payload;
        },
        setIsLoading: (state, action) => {
                  
            state.isLoading = action.payload;
        },
        setWaveContainer: (state, action) => {
           
            state.waveContainer = action.payload;
        },
        setShowMiniplayer: (state, action) => {
            state.showMiniplayer = action.payload;
        },
      
    },  
    
})

export const nextSong = createAsyncThunk('song/nextSong', async (_, { getState, dispatch }) => {
    const state = getState();
    const { playlist, currentIndex, loop } = state.song;
    console.log("nextBTN PLAYLIST", playlist)
    let newIndex = currentIndex + 1;

    if(newIndex >= playlist.length) {
        if(loop) {
            newIndex = 0; 
        } else {
            return; 
        }
    }
    
    if(playlist.length > 0) {
    
dispatch(setCurrentSong(playlist[newIndex]))
dispatch(setCurrentIndex(newIndex))
dispatch(setIsPlaying(true))
dispatch(setIsLoading(false))
};
})


export const prevSong = createAsyncThunk('song/prevSong', async (_, { getState, dispatch }) => {
    const state = getState();
    const { playlist, currentIndex, loop } = state.song;
    let newIndex = currentIndex - 1;

    if(newIndex <= -1) {

        if(loop) {
            newIndex = playlist.length - 1; 
        } else {
            return; 
        }
};
        if(newIndex != -1){
dispatch(setCurrentSong(playlist[newIndex]))
dispatch(setCurrentIndex(newIndex))
dispatch(setIsPlaying(true))
dispatch(setIsLoading(false))
}

})

export const { setCurrentSong,clearActiveSongData, setIsPlaying, setPlaylist, setCurrentIndex, setVolume, setLoop, setIsMinimized, setShowQueue, setIsLoading, setWaveContainer, setShowMiniplayer } = Song.actions;

export default Song.reducer;