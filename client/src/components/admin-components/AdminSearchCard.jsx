import React,{useState, useEffect} from 'react'
import InputButtonStroke from '../InputButtonStroke'
import axios from 'axios'

function AdminSearchCard({song}) {
    console.log(song.featured)
const [trending, setTrending] = useState(song.trending)
const [featured, setFeatured] = useState(song.featured)
useEffect(()=>{
        console.log(song.featured)
},[])
useEffect(()=>{
 axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/updateTrending`, 
    {
    songId: song._id,
    trending
})
},[trending])

useEffect(()=>{
 axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/updateFeatured`, 
    {
    songId: song._id,
    featured
})
},[featured])


  function formatDuration(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }



  return (
 <div className='w-[280px] h-max border border-[var(--general-white)]/10 p-2 rounded-xl'>
         <span className="px-3 text-[var(--general-white)] flex flex-col">
            <h2 className="truncate-text text-xs 2xl:text-sm font-semibold">
              {song.name}
            </h2>
            <h3 className="text-xs font-light text-[var(--general-white)]/40">
              unknown
            </h3>
            <h4 className="text-xs font-light text-[var(--general-white)]">
              {formatDuration(121)}
            </h4>
          </span>
          <div className='flex justify-between mt-2'>
            <InputButtonStroke text={"Trending"} onClick={()=>setTrending((i)=>!i)} className={`${trending? "bg-green-700 hover:bg-green-600":"bg-[#ffffff15]"}`}/>
            <InputButtonStroke text={"Featured"} onClick={()=>setFeatured((i)=>!i)} className={`${featured? "bg-green-700 hover:bg-green-600":"bg-[#ffffff15]"}`}/>
   
          </div>
 </div>
  )
}

export default AdminSearchCard