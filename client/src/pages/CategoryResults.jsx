import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SongListCard } from '../components'
import SongListCardSkeleton from '../components/skeleton/SongListCardSkeleton'

function CategoryResults() {
    const param = useParams()
const [loading, setLoading] = useState(false)
const [songs, setSongs] = useState(false)

async function fetchSongs(){
    
    try {
          const results = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/request/getKeywordResults/${param.keyword}`)
       if(results.data.data.length){
        setSongs(results.data.data)
       }
       else{
         setSongs(null)
       }
    } catch (error) {
        console.log(error)
    }finally{
        setLoading(false)
    }
}

useEffect(()=>{
     setLoading(true)
   fetchSongs()
},[])
  return (
<>

{
loading? 
<div>
<SongListCardSkeleton/>
<SongListCardSkeleton/>
<SongListCardSkeleton/>
</div>:
songs ? songs.map(song=>  <SongListCard SongDetails={song}/>) : 
<div className='flex items-center justify-center w-full h-full text-[var(--general-white)]'>

  No Songs Found

</div>

}
</>
  )
}

export default CategoryResults