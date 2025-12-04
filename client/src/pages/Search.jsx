import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { SongListCard } from '../components'

function Search() {
    const [songs, setSongs] = useState()
    const {searchedResults} = useSelector(state => state.searchData)
   useEffect(() => {
  setSongs(searchedResults)
   }, [searchedResults])
   
  return (
   <>
   {songs? songs.map(i=> <SongListCard SongDetails={i} key={i._id}/>) : <h1 className='text-red-600'>No results found</h1> }
   </>
  )
}

export default Search