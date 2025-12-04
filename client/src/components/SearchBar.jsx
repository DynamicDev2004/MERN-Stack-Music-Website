import React, { useRef } from 'react'
import { useForm } from 'react-hook-form';
import { InputButtonFilled, LoaderSpinner } from '../components';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedData } from '../features/searchSlice';

function SearchBar() {
      const {register, handleSubmit, formState:{errors}} = useForm()
      const {register: mobileRegister, handleSubmit: mobileSubmit, formState:{errors:mobileErrors}} = useForm()
      const dispatch = useDispatch()
      const [searchLoading, setsearchLoading] = useState(false);
      const [resultsMessage, setResultsMessage] = useState(false);
      const navigate = useNavigate()
const mobileSearchWindowRef = useRef()


      const handleSearchSubmit = async(searchValue)=>{
        try {
  setsearchLoading(true)
  const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/request/search`,searchValue)

  if(res && res.data && res.data.data.length > 0){


dispatch(setSearchedData(res.data.data))
setResultsMessage(null)
 navigate('/dashboard/search')
mobileSearchWindowRef.current.classList.add('hidden')
  }
  else{
dispatch(setSearchedData(null))
setResultsMessage("No Results Found")
  }
} catch (error) {
  console.log(error)
}
finally{setsearchLoading(false)}
}


  return (
    // md:flex hidden
    <>
    <div className='flex-col md:flex hidden'>
          <form autoComplete='off' onSubmit={handleSubmit(handleSearchSubmit)} id='searchBar'>
            <div  className='pl-3 border max-w-[300px] justify-between flex w-full border-[var(--general-white)]/10 p-1 xl:w-[400px] rounded-2xl bg-[var(--general-white)]/5'>
            <input  type="text"  {...register('search', {minLength: {value: 5, message:"Write Minimum 5 Letters"}})} className='focus:outline-0 bg-transparent w-full text-sm text-[var(--general-white)]'/>
            <div className=' flex flex-col justify-end'>
            { searchLoading?  <LoaderSpinner/> :
            <InputButtonFilled text={"search"} type='submit'/>}
            </div>
            </div>
          </form>
            {errors.search && <p className='text-red-500 text-xs text-nowrap'>{errors.search.message}</p>}
            {resultsMessage? <p className='text-red-500 text-xs text-nowrap'>{resultsMessage}</p> : null}
            </div>

{/* mobile search icon */}
            <div className='md:hidden'>
              <i className="fi fi-rr-search text-[var(--general-white)] mt-2 block" onClick={()=>{mobileSearchWindowRef.current.classList.replace('hidden', 'flex')}}></i>
              <div className='absolute hidden backdrop-blur-2xl top-0 left-0 w-screen h-screen z-50 p-3 items-center justify-center' ref={mobileSearchWindowRef}> 
                    <i className="fi fi-rr-cross text-[var(--general-white)] m-2 absolute top-3 right-3" onClick={()=>{mobileSearchWindowRef.current.classList.add('hidden')}}></i>
                   <div className=' flex-col w-full'>
          <form autoComplete='off' onSubmit={mobileSubmit(handleSearchSubmit)} id='searchBar'>
            <div  className='pl-3 border justify-between flex w-full border-[var(--general-white)]/10 p-1 xl:w-[400px] rounded-2xl bg-[var(--general-white)]/5'>
            <input  type="text"  {...mobileRegister('search', {minLength: {value: 5, message:"Write Minimum 5 Letters"}})} className='focus:outline-0 bg-transparent w-full text-sm text-[var(--general-white)]'/>
            <div className=' flex flex-col justify-end'>
           { searchLoading?  <LoaderSpinner/> :
            <InputButtonFilled text={"search"} type='submit'/>}
            </div>
            </div>
          </form>
            {mobileErrors.search && <p className='text-red-500 text-xs text-nowrap'>{mobileErrors.search.message}</p>}
            {resultsMessage? <p className='text-red-500 text-xs text-nowrap'>{resultsMessage}</p> : null}
            </div>
              </div>
            </div>

    </>
  )
}

export default SearchBar