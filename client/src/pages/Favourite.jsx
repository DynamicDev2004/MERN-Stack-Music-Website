import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { SongListCard } from '../components';
import SongListCardSkeleton from '../components/skeleton/SongListCardSkeleton';
import { setPlaylist } from '../features/songSlice';
import { useDispatch } from 'react-redux';
import { setFavouriteSongs } from '../features/songsDataSlice';

function Favourite() {

  const [songs, setSongs] = useState()
const [loading, setLoading] = useState()
const dispatch = useDispatch()
  const fetchSongs = async () => {
setLoading(true)
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/request/getFavourite`,
        { withCredentials: true }
      );
if(res.data.data.length > 0){
 const songList = await res.data.data.map(song=> {
    song.songId.visibility = 'favourite';
    return song.songId
   });
   
   setSongs(songList)
console.log("FAVOURITE SONGS FETCHED", songList)
dispatch(setFavouriteSongs(songList))
}
else{
  setSongs(null)
}

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

    }
  };
  useEffect(() => {
  fetchSongs()
  }, [])
  
  return (
    <>{
      loading? 
       <div>
      <SongListCardSkeleton/>
      <SongListCardSkeleton/>
      <SongListCardSkeleton/>
      <SongListCardSkeleton/>
     </div> :
      songs ?
songs.map(song=> <SongListCard SongDetails={song}/>): <div className='w-full h-full flex justify-center items-center text-[var(--primary-colour)]'>
  No Song's Found
</div>
}
</>
  )
}

export default Favourite