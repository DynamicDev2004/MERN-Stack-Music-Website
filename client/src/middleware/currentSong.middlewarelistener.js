import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setCurrentSong } from "../features/songSlice";
import axios from "axios";
const songMiddleware = createListenerMiddleware()

songMiddleware.startListening({
    actionCreator: setCurrentSong, 
    effect:(action, listenerApi)=>{

        setTimeout(async() => {
            try {
                
             await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/request/recent`, listenerApi.getState().song.currentSong)
            } catch (error) {
                console.log(error)
            }
        
        }, 2000);
    }})

    export default songMiddleware