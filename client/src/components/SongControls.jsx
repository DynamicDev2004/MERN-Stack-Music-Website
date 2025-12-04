import React, { use } from 'react'
import {LinkButtonFilled, SongLoadingWaveSkeleton, LinkButtonStroke, FilledButton, DefaultMusicImage} from "./index.js";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector,  } from "react-redux";
import { prevSong, nextSong, setCurrentSong, setIsPlaying, setLoop, setShowMiniplayer, setVolume, setShowQueue } from "../features/songSlice.js";
import { debounce } from "lodash";
import axios from "axios";


function SongControls({backBtnFn}) {
const dispatch= useDispatch()
const volumeControlRef = useRef()
const volumeIcon = useRef()
const {currentSong , isPlaying, currentIndex, volume, loop, isLoading, songQueue} = useSelector(state => state.song)


  const [favourite, setFavourite] = useState(currentSong?.isFavourite)

useEffect(() => {
  setFavourite(currentSong?.isFavourite)
}, [currentSong])

useEffect(()=>{
 dispatch(setShowMiniplayer(true))
},[isLoading])

const toggleQueueWindow = ()=>{
dispatch(setShowQueue(!songQueue))
}

const handlePlay = ()=>{
dispatch(setIsPlaying(!isPlaying))
}

const handleRepeat = ()=>{
dispatch(setLoop(!loop))
}

const handleVolumeChange = (e)=>{
dispatch(setVolume(e.target.value))
}
const nextSongHandle = ()=>{
  dispatch(nextSong())
}
const prevSongHandle = ()=>{
  dispatch(prevSong())
}

  const handleFavourite =  debounce(async (SongData)=>{

try {
     const res =  await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/favourite`,SongData)
    if(res.status === 200 && res.data.message.title ==='Added'){
      dispatch(setCurrentSong({...currentSong, isFavourite: true}))
      setFavourite(true)
    }
    else if(res.status === 200 && res.data.message.title ==='Removed'){
           dispatch(setCurrentSong({...currentSong, isFavourite: false}))
      setFavourite(false)
    }
} catch (error) {
  console.log(error)
}
  },200)

const toggleVolume = ()=>{


volumeControlRef.current.classList.toggle('flex')
volumeControlRef.current.classList.toggle('hidden')
volumeIcon.current.classList.toggle('hidden')
volumeIcon.current.classList.toggle('flex')
setTimeout(() => {
  volumeControlRef.current.classList.toggle('flex')
volumeControlRef.current.classList.toggle('hidden')
volumeIcon.current.classList.toggle('hidden')
volumeIcon.current.classList.toggle('flex')
}, 6000);
}
  return (
<>

<div className={`flex flex-col justify-between h-full w-full`}>

    <div className="flex justify-between items-center">
          <button onClick={backBtnFn} className="w-8 h-8 rounded-full border border-[var(--general-white)]/10 flex items-center justify-center hover:bg-[var(--general-white)]/10 cursor-pointer">
            <i className="fi fi-rr-angle-small-left text-[var(--general-white)] text-xl mt-[6px]"></i>
          </button>
          <h1 className="text-[var(--general-white)] font-semibold text-sm">
            Now Playing
          </h1>
          <div className="w-8">
           
          </div>
        </div>
    
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-24 h-24 sm:h-26 sm:w-26 md:h-30 md:w-30 lg:w-36 lg:h-36 mt-3 rounded-full overflow-hidden shadow-2xl">
            <img
              src="/assets/default-playback-Image/defaultMusicImage.svg"
              alt="Album Art"
              className="w-full h-full object-cover pointer-events-none bg-gradient-to-r from-[var(--gradient-start-colour)]/50 to-[var(--gradient-end-colour)]/10 p-3"
            />
            
          </div>
          <h2 className="max-w-[260px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-[250px] xl:max-w-[350px] 2xl:max-w-[500px] truncate-text text-[var(--general-white)] font-semibold mt-5 text-sm md:text-md text-center">
            {currentSong?.name || "unknown"}
          </h2>
          <p className="text-[var(--general-white)]/50 text-xs mt-2">
             {currentSong?.artist || "unknown"}
          </p>


{isLoading? <SongLoadingWaveSkeleton/> : null} 
<div id='waveContainer' className='h-20 w-[80%] my-3'> </div>

            <div className="flex items-center justify-center gap-4 ">
             
  
                <i onClick={()=>handleFavourite(currentSong)} className={`fi fi-rr-heart ${favourite? "text-red-500": "text-[var(--general-white)]/40"} hover:text-red-500 cursor-pointer transition-all duration-200 ease-in-out text-md mt-2`}></i>
                <div className="flex gap-5 items-center rounded-full border border-[var(--primary-colour)]/20 bg-[var(--primary-colour)]/7 px-5 py-2">
                <i onClick={prevSongHandle} className="mt-1 fi fi-rr-step-backward text-[var(--general-white)]/50 hover:text-[var(--primary-colour)] cursor-pointer transition-all duration-200 ease-in-out text-md"></i>
                <FilledButton onClick={handlePlay} text={<i className={`fi ${isPlaying? "fi-rr-pause": "fi-rr-play"}  text-lg mt-1`}></i>} className={`w-10 h-10 flex items-center justify-center`}/>
                <i onClick={nextSongHandle} className="mt-1 fi fi-rr-step-forward text-[var(--general-white)]/50 hover:text-[var(--primary-colour)] cursor-pointer transition-all duration-200 ease-in-out text-md"></i>
               </div>
                <i onClick={handleRepeat} className={` ${loop && "text-[var(--primary-colour)]"} mt-1 fi fi-rr-arrows-repeat text-[var(--general-white)]/50 hover:text-[var(--primary-colour)] cursor-pointer transition-all duration-200 ease-in-out text-md`}></i>
             
               
            </div>


<div className='flex gap-8 items-center justify-center mt-5 '>

  <div className=' flex-col hidden' ref={volumeControlRef}>
  <span className='text-[var(--general-white)]/60 text-xs sm:text-sm'>Volume {volume*100}</span>

<input type="range"    
        min="0"
        max="1"
        step="0.10" 
        onChange={(e)=>handleVolumeChange(e)}
        value={volume}
        className='w-full max-w-[130px] my-2 accent-[var(--primary-colour)]/80 opacity-65 h-1 cursor-pointer'
        /></div>


           <i onClick={toggleVolume} ref={volumeIcon} className={`mt-1 fi fi-rr-volume text-[var(--general-white)]/50 hover:text-[var(--primary-colour)] cursor-pointer transition-all duration-200 ease-in-out text-md`}></i>
     <i className="mt-1 fi fi-rr-download text-[var(--general-white)]/50 hover:text-red-500 cursor-pointer transition-all duration-200 ease-in-out text-md"></i>
           <i onClick={toggleQueueWindow} className={`mt-1 fi fi-rr-list-music text-[var(--general-white)]/50 hover:text-[var(--primary-colour)] cursor-pointer transition-all duration-200 ease-in-out text-md`}></i>

</div>

       
        </div>

        </div>
       
        </>
  )
}

export default SongControls