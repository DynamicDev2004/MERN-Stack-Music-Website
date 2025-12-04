import React, {useState, useEffect } from 'react'
import { MiniSongCard } from '../index.js'
import { useSelector } from 'react-redux';
import axios from 'axios';
import MiniSongCardSkeleton from '../skeleton/MiniSongCardSkeleton.jsx';
function Sidebar() {

      const headingStyling =
    "text-[var(--general-white)] text-sm 2xl:text-md font-bold 2xl:text-lg";
  const [songs, setSongs] = useState([])
  const [featuredSongs, setFeaturedSongs] = useState([])
  const [loading, setLoading] = useState()
  const [featuredloading, setFeaturedLoading] = useState()

    const fetchTrendingSong = async()=>{
setLoading(true)
       try {
         const res =await axios.get(
           `${import.meta.env.VITE_BASE_URL}/api/v1/request/getTrending`,
           { withCredentials: true }
         );
   if(res.data.data.length > 0){
    const songsList =res.data.data.map(song => { song.visibility = 'trending'; return song})
          setSongs(songsList)
   }
   else{
    setSongs(null)
   }
       } catch (error) {
        console.log(error)
       }
       finally{
setLoading(false)
       }

    }


    const fetchFeaturedSong = async()=>{
setFeaturedLoading(true)
       try {
         const res =await axios.get(
           `${import.meta.env.VITE_BASE_URL}/api/v1/request/getFeatured`,
           { withCredentials: true }
         );
   if(res.data.data.length > 0){
   const songList = res.data.data.map(song => { song.visibility = 'featured'; return song})
          setFeaturedSongs(songList)
   }
   else{
    setFeaturedSongs(null)
   }
       } catch (error) {
        console.log(error)
       }
       finally{
setFeaturedLoading(false)
       }

    }

  useEffect(() => {
fetchTrendingSong()
fetchFeaturedSong()


    }, [])
    

  return (
    <div className="p-5 overflow-scroll h-full no-scrollbar">
        


  <span className={`${headingStyling}`}>Trending</span>
       <div className="max-h-[280px] no-scrollbar my-2 overflow-scroll [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
{loading? 
<div> 
  <MiniSongCardSkeleton/>
  <MiniSongCardSkeleton/>
  <MiniSongCardSkeleton/>
</div>:
songs && 
songs.map(song=> <MiniSongCard song={song} key={song._id} playlist={songs}/>)}
 
  {/* <MiniSongCard trandingSongTitle="Song Name" isPlaying={false} />
  <MiniSongCard trandingSongTitle="Song Name" isPlaying={false} />
  <MiniSongCard trandingSongTitle="Song Name" isPlaying={false} />
  <MiniSongCard trandingSongTitle="Song Name" isPlaying={false} /> */}

</div>

  <span className={`${headingStyling}`}>Most Liked</span>
       <div className="max-h-[280px] no-scrollbar my-2 overflow-scroll [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
{/* 
  <MiniSongCard trandingSongTitle="Song Name" isPlaying={false} />
  <MiniSongCard trandingSongTitle="Song Name" isPlaying={false} />
  <MiniSongCard trandingSongTitle="Song Name" isPlaying={false} />
  <MiniSongCard trandingSongTitle="Song Name" isPlaying={false} />
  <MiniSongCard trandingSongTitle="Song Name" isPlaying={false} /> */}

  {featuredloading? 
  <div> 
  <MiniSongCardSkeleton/>
  <MiniSongCardSkeleton/>
  <MiniSongCardSkeleton/>
</div>
:
featuredSongs && 
featuredSongs.map(song=> <MiniSongCard song={song} key={song._id} playlist={featuredSongs}/>)}

</div>






    </div>

                    
  )
}

export default Sidebar