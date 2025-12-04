import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalLibSongs } from '../features/songsDataSlice';
import axios from 'axios';
import SongListCardSkeleton from '../components/skeleton/SongListCardSkeleton';
import { SongListCard } from '../components';
function Explore() {

    const [loading, setLoading] = useState(false)
    const {globalLibSongs} = useSelector(state=> state.songsData)
    const [songs, setSongs] = useState([])
    const dispatch = useDispatch()
    const fetchSongs = async () => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/request/getGlobalSongs`,
        { withCredentials: true }
      );

      setSongs(res.data.data);
     
      dispatch(setGlobalLibSongs(res.data.data))

return res.data.data
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

    }
  };

    useEffect(()=>{
        setLoading(true)
        fetchSongs()
        console.log('USEEFF')
    },[])
  return (
<>

{loading?  <div>
      <SongListCardSkeleton/>
      <SongListCardSkeleton/>
      <SongListCardSkeleton/>
      <SongListCardSkeleton/>
     </div> : 
songs.map(song=> <SongListCard SongDetails={song} key={song._id}/>)}

</>
  )
}

export default Explore