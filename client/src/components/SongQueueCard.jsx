import { useSortable } from '@dnd-kit/sortable';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {CSS} from '@dnd-kit/utilities';
function SongQueueCard({songDetails}) {

    const {currentSong , isPlaying, currentIndex, volume, loop, isLoading} = useSelector(state => state.song)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: songDetails._id})

  const style ={
    transform: CSS.Transform.toString(transform),
    transition,
     touchAction: "none",
  }
  return (
          <div style={style} ref={setNodeRef}  {...attributes} {...listeners} className={`flex items-center gap-3 border p-2 mb-2 rounded-xl hover:bg-[var(--general-white)]/10 cursor-pointer hover:opacity-100  ${currentSong && currentSong._id === songDetails._id ? 'border-2 border-[var(--primary-colour)]/20 opacity-100' : 'border-[var(--general-white)]/10 opacity-50'}`}>
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img
                  src={"https://static.vecteezy.com/system/resources/thumbnails/052/535/053/small_2x/music-controller-mixer-dj-board-at-an-electronic-party-photo.jpg"}
                  alt={''}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1">
                <h2 className="text-[var(--general-white)]/85 text-xs font-semibold">{songDetails.name}</h2>
                <h3 className="text-[var(--general-white)]/40 text-xs">{songDetails.artist}</h3>
              </div>
              <i
class=
"fi fi-rr-menu-burger text-[var(--general-white)]/40 text-xs"
></i>
            </div>
  )
}

export default SongQueueCard