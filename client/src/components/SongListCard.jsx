import { useState, useRef, useEffect } from "react";
import LoaderSpinner from "./LoaderSpinner";
import { useDispatch, useSelector,  } from "react-redux";
import { setCurrentSong, setIsPlaying, setWaveContainer } from "../features/songSlice.js";
import axios from "axios";
import { debounce } from "lodash";
import {DefaultMusicImage} from "./index.js";

function SongListCard({ SongDetails, Global, Private, deleteFn = () => {}, allowDelete = false }) {

  const [gradientPos, setGradientPos] = useState(50);
  const [hovered, setHovered] = useState(false);
  const [longPress, setLongPress] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const timerRef = useRef(null);
const iconref = useRef()
  const dispatch = useDispatch();
  const [favourite, setFavourite] = useState(SongDetails.isFavourite)
 const {currentSong, isPlaying, isLoading, isFavourite} = useSelector(state=>state.song)



 useEffect(() => {
  iconref.current.classList.replace('fi-rr-pause', 'fi-rr-play')

if(currentSong && currentSong._id === SongDetails._id){
if(isLoading){
  setSpinner(true)
}
else{
  setSpinner(false)
  if(isPlaying){

    iconref.current.classList.replace('fi-rr-play', 'fi-rr-pause')
  }
  else{
  iconref.current.classList.replace('fi-rr-pause', 'fi-rr-play')
  } 
}
}
else{
  setSpinner(false)
}
}, [currentSong, isPlaying, isLoading]);
  
  function formatDuration(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  const handleMouseMove = (e) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    setGradientPos(x);
  };

  const handleMouseDown = () => {
    if(allowDelete === false) return;
    setLongPress(false);
    timerRef.current = setTimeout(() => {
      setLongPress(true);
    }, 400);
  };

  const handleMouseUp = () => {
        if(allowDelete === false) return;
    clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
  };

  const handleFavourite =  debounce(async (SongData)=>{

try {
     const res =  await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/favourite`,SongData)
    if(res.status === 200 && res.data.message.title ==='Added'){
      setFavourite(true)
    }
    else if(res.status === 200 && res.data.message.title ==='Removed'){
      setFavourite(false)
    }
} catch (error) {
  console.log(error)
}
  },200)

  return (
    <div className="relative w-full touch-none" >

     {allowDelete && <button
        className={`absolute right-0 flex items-center justify-center top-0 h-full w-20 bg-red-500 rounded-xl transition-all duration-500 ease-in-out text-2xl text-white z-0 ${
          longPress ? "opacity-100" : "opacity-0"
        }`}
        onClick={deleteFn}
      >
        <i className="fi fi-rr-trash text-2xl ml-5 mt-1"></i>
      </button>}

      <div
        className={`flex w-full items-center backdrop-blur-2xl rounded-xl p-2 justify-between my-2 cursor-pointer transition-all duration-500 ease-in-out relative z-10 ${
          longPress ? "translate-x-[-50px]" : "translate-x-0"
        }`}
        style={{
          background: hovered
            ? `linear-gradient(
                 to right,
                 transparent,
                 color-mix(in srgb, var(--primary-colour) 10%, transparent) ${gradientPos}%,
                 transparent
               )`
            : "transparent",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          handleMouseLeave();
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="flex w-[calc(85%-70px)] justify-start items-center">
          <div className="block overflow-hidden md:min-w-14 md:min-h-14 min-w-9 min-h-9  rounded-lg">
            {/* <img
              className="object-cover w-full h-full"
              src="https://static.vecteezy.com/system/resources/thumbnails/052/535/053/small_2x/music-controller-mixer-dj-board-at-an-electronic-party-photo.jpg"
              alt=""
            /> */}
          <DefaultMusicImage/>
          </div>
          <div className="pl-3 text-[var(--general-white)] flex flex-col w-full">
            <h2 className="truncate-text text-xs 2xl:text-sm font-semibold text-wrap w-full">
              {SongDetails.name}
            </h2>
            <h3 className="text-xs font-light text-[var(--general-white)]/40 ">
              {SongDetails.artist}
            </h3>
            <h4 className="text-xs font-light text-[var(--general-white)]">
              {formatDuration(SongDetails.duration)}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-4 pr-3">
          <i onClick={()=>handleFavourite(SongDetails)} className={`fi fi-rr-heart ${favourite? "text-red-500": "text-[var(--general-white)]/40"} hover:text-red-500 cursor-pointer transition-all duration-200 ease-in-out text-md mt-2`}></i>

       

       <div
onClick={() => {

  if (currentSong && currentSong._id === SongDetails._id) {
    dispatch(setIsPlaying(!isPlaying));
  } else {
    dispatch(setCurrentSong(SongDetails));
    dispatch(setIsPlaying(true));
dispatch(setWaveContainer("#waveContainer"))
  }
}}

  className="relative w-9 h-9 flex items-center justify-center 
    rounded-full bg-[var(--primary-colour)]/10 border border-[var(--primary-colour)]/40
    hover:bg-[var(--primary-colour)] 
    transition-all duration-300 ease-in-out cursor-pointer group"
>
  {spinner && (
    <div className="absolute inset-0 flex items-center justify-center">
      <LoaderSpinner />
    </div>
  )}

  <i
    id={`icon-${SongDetails._id}`}
    ref={iconref}
    className="fi fi-rr-play text-[var(--general-white)]/40 
      group-hover:text-[var(--general-black)] mt-1 text-md"
  ></i>
</div>

        </div>
      </div>
    </div>
  );
}

export default SongListCard;
