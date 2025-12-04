import gsap from 'gsap';
import {React, use, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { nextSong, prevSong, setIsPlaying, setLoop, setShowMiniplayer, setShowQueue } from '../features/songSlice';

function ActiveSongMiniCard({isActive, onClickFn = ()=>{}, className=""}) {
  const {isPlaying, currentSong, loop} = useSelector((state)=>state.song);
  const dispatch= useDispatch()

  const handlePlay = (e)=>{
  e.stopPropagation()
  dispatch(setIsPlaying(!isPlaying))
  
  }

 const nextSongHandle = (e)=>{
  e.stopPropagation()
  dispatch(nextSong())
}
const prevSongHandle = (e)=>{
  e.stopPropagation()
  dispatch(prevSong())
}

const handleRepeat = (e)=>{
  e.stopPropagation()
dispatch(setLoop(!loop))
}
const showQueue = (e)=>{
dispatch(setShowMiniplayer(true))
dispatch(setShowQueue(true))
}

      useEffect(() => {

if(isActive === true){
    gsap.to("#ActiveSongMiniCard", {scale:1, opacity:1, duration: .3 , display:"flex"})
}
if(isActive === false){
    gsap.to("#ActiveSongMiniCard", {scale:.5, opacity:0, duration: 1, display:"none"})
}
  }, [isActive]);

  return (
    <div onClick={onClickFn} className={`${className} w-full h-12 bg-[var(--primary-colour)]/7 backdrop-blur-2xl border border-[var(--general-white)]/10 rounded-3xl flex items-center justify-between px-4 gap-4 absolute bottom-0 z-[99999]`} id='ActiveSongMiniCard'>

    
        <div className="flex gap-4 items-center">
            <i onClick={(e)=>prevSongHandle(e) } className="fi fi-rr-step-backward mt-1 text-[var(--general-white)]/50 hover:text-[var(--primary-colour)] cursor-pointer transition-all duration-200 ease-in-out text-md"></i>
         
          <div onClick={(e)=>handlePlay(e)}
            className="w-9 h-9 flex items-center justify-center 
           rounded-full bg-[var(--primary-colour)]/10 border border-[var(--primary-colour)]/40
           hover:bg-[var(--primary-colour)] 
           transition-all duration-300 ease-in-out cursor-pointer group"
          >
            <i 
              className={`fi ${isPlaying? 'fi-rr-pause' : 'fi-rr-play'} text-[var(--general-white)]/40 
             group-hover:text-[var(--general-black)] mt-1
             text-md`}
            ></i>
          </div>


            <i onClick={(e)=>nextSongHandle(e)} className="fi fi-rr-step-forward mt-1 text-[var(--general-white)]/50 hover:text-[var(--primary-colour)] cursor-pointer transition-all duration-200 ease-in-out text-md"></i>
        </div>

        {/* middle */}
    <div className="">
            <h2 className=" max-w-[100px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-[250px] xl:max-w-[350px] 2xl:max-w-[500px] truncate-text text-[var(--general-white)] font-semibold text-xs 2xl:text-sm text-center">
                {currentSong?.name || "unknown"}
            </h2>
            <p className="text-[var(--general-white)]/50 text-xs text-center">
                {currentSong?.artist || "unknown"}
            </p>
        </div>
        
        
        {/* right */}
               <div className="flex gap-4 items-center mt-1">
            <i onClick={(e)=>handleRepeat(e)} className={`fi fi-rr-arrows-repeat mt-1 ${loop? 'text-[var(--primary-colour)]' : 'text-[var(--general-white)]/50'} hover:text-[var(--primary-colour)] cursor-pointer transition-all duration-200 ease-in-out text-md`}></i>
            <i onClick={(e)=>showQueue(e)} className="fi fi-rr-list-music mt-1 text-[var(--general-white)]/50 hover:text-[var(--primary-colour)] cursor-pointer transition-all duration-200 ease-in-out text-md"></i>
            <i className="fi fi-rr-download mt-1 text-[var(--general-white)]/50 hover:text-[var(--primary-colour)] cursor-pointer transition-all duration-200 ease-in-out text-md"></i>
        </div>
    </div>
  )
}

export default ActiveSongMiniCard