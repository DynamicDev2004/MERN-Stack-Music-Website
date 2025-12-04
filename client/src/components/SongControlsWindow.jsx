import React, { use, useEffect, useRef } from "react";
import gsap from "gsap";

import SongControls from "./SongControls";
import SongQueueCard from "./SongQueueCard";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIndex, setPlaylist, setShowQueue } from "../features/songSlice";
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";

function SongControlsWindow({ isActive, backBtnFn = () => {} }) {

const [queueSongs, setQueueSongs] = React.useState([])
  const {userLibSongs, globalLibSongs, historySongs, favouriteSongs} = useSelector((state)=> state.songsData);
  const {currentSong , isPlaying, currentIndex, volume, loop, isLoading, playlist, showQueue} = useSelector(state => state.song)
  const queueRef = useRef()
const dispatch= useDispatch()




useEffect(()=>{
setQueueSongs(playlist)
}, [playlist])

useEffect(()=>{

if(currentSong && currentSong?.visibility === "private"){


if(playlist.length > 0 && playlist[0].visibility != 'private' || playlist.length == 0){
dispatch(setPlaylist(userLibSongs))
}
}
if(currentSong && currentSong?.visibility === "recent"){
if(playlist.length > 0 && playlist[0].visibility != 'recent' || playlist.length == 0){
dispatch(setPlaylist(historySongs))
console.log("recent ctrl",historySongs)
}
}
if(currentSong && currentSong?.visibility === "favourite"){
if(playlist.length > 0 && playlist[0].visibility != 'favourite' || playlist.length == 0){
dispatch(setPlaylist(favouriteSongs))
}
}

if(currentSong && currentSong?.visibility === "global"){
  if(playlist.length > 0 && playlist[0].visibility != 'global' || playlist.length == 0){
dispatch(setPlaylist(globalLibSongs))
console.log("global",globalLibSongs)

  }
}


},[currentSong, userLibSongs])

useEffect(() => {
let newIndex = queueSongs.findIndex(song => song._id === currentSong?._id);
if(newIndex !== -1 ){
  dispatch(setCurrentIndex(newIndex))
}
}, [queueSongs, currentSong, historySongs])



  useEffect(() => {
if(isActive === true){
    gsap.to("#SongControlsWindow", {y:0, opacity:1, duration: .5})
}
if(isActive === false){
    gsap.to("#SongControlsWindow", {y:800, opacity:0, duration: .5})
}
  }, [isActive]);

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor,{ coordinateGetter: sortableKeyboardCoordinates})
  )

const toggleQueueWindow = (e)=>{
dispatch(setShowQueue(!showQueue))
}

  const  dragFindIndex = id => queueSongs.findIndex((song)=> song._id === id)


  const handleDrag = event=>{
    const {active, over} = event
    console.log(active, over)
    
    if(active === over) return 
    setQueueSongs((song)=> {
     const oldSongIndex = dragFindIndex(active.id);
     const newSongIndex = dragFindIndex(over.id);
 
    const newPlaylist = arrayMove(song,oldSongIndex, newSongIndex)
    dispatch(setPlaylist(newPlaylist))
    return newPlaylist
       })
  }
  return (
    <>
      <div
        className="backdrop-blur-2xl bg-[var(--general-black)]/40 w-full h-full rounded-3xl border border-[var(--general-white)]/10 p-4 flex flex-col gap-4 absolute top-0 left-0 opacity-0 z-[40]"
        id="SongControlsWindow"
      >
     
        <div className="flex justify-between items-center h-full">
   
        <SongControls backBtnFn={backBtnFn} />
          <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDrag}>
            
            {/* song queue box */}
            {/*absolute left-0 top-0 bg-amber-500 z-50 w-full */}
     { showQueue &&
       <div className="absolute left-0 top-0 bg-[var(--general-black)]/100 pr-5 lg:pr-5 border-none z-50 w-full pt-3 lg:relative lg:bg-transparent lg:block h-full  overflow-y-auto scrollbar-hide lg:border-l border-[var(--general-white)]/10 pl-4" ref={queueRef}>
   
    <div onClick={toggleQueueWindow}  className="flex border rounded-full mb-3 border-[var(--general-white)]/8 items-center justify-center text-[var(--general-white)]/50 hover:text-[var(--primary-colour)] cursor-pointer">
      <i className={`mt-1 fi fi-rr-angle-small-down text-2xl transition-all duration-200 ease-in-out text-md`}></i>
      </div>

          <h1 className="text-[var(--general-white)] mb-4 font-semibold text-sm">
            Play next
          </h1>
          <SortableContext items={queueSongs.map(song=>song._id)} strategy={verticalListSortingStrategy}>
          {queueSongs.map((song, index)=><SongQueueCard songDetails={song} key={index}/>)}
</SortableContext>
   
    </div>
     }
      </DndContext>
      </div>
      </div>
    </>
  );
}

export default SongControlsWindow;
