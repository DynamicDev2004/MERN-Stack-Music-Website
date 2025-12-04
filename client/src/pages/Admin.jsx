
import MultipleSelectChip from '../components/MultipleSelectChip'
import { InputButtonFilled, InputButtonStroke, LoaderSpinner, SongListCard } from '../components';
import axios from "axios";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { showToast } from "../features/toastSlice";
import { useForm } from 'react-hook-form';
import AdminSearchCard from '../components/admin-components/AdminSearchCard';





function Admin() {
  const [selected, setSelected] = useState([]);
 const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setsearchLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [seachedResults, setSeachedResults] = useState(null)
  const dispatch = useDispatch()
  const {register, handleSubmit, formState:{errors}} = useForm()
   const handleChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  function formatDuration(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }


  const handleSongSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append('category', JSON.stringify(selected))
    formData.append('trending', false)
    try {
      setProcessing(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/uploads/global`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        dispatch(showToast({message:"1 Song uploaded", type:"success", heading:"Successful"}))
        setFile(null)};
    } catch (err) {
      console.log(err);
    } finally {
      setProcessing(false);
    }

  
  };

const handleSearchSubmit = async(searchValue)=>{

try {
  setsearchLoading(true)
  const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/request/search`,searchValue)
  if(res && res.data && res.data.data.length > 0){
  setSeachedResults(res.data.data)
  }
  else{
  setSeachedResults(null)
  }
} catch (error) {
  console.log(error)
}
finally{setsearchLoading(false)}
}
   

useEffect(()=>{
console.log(selected)
},[selected])

  return (
    <div className='p-2'>
<div className='flex flex-row gap-3 border border-[var(--general-white)]/20 rounded-2xl p-5'>


    <div className='flex-1'>
       <form
        onSubmit={handleSongSubmit}
        encType="multipart/form-data"
        className="w-full h-full flex flex-col justify-center items-center"
      >
        <label
          htmlFor="uploadFile"
          className="w-full h-full flex justify-center items-center flex-col cursor-pointer"
        >
          <i
            className={`fi ${
              file ? "fi-rr-music-alt" : "fi-rr-folder-upload"
            } text-[var(--primary-colour)]/50 text-[110px] 2xl:text-[180px]`}
          ></i>

          {file ? (
            <marquee className="max-w-[300px] text-sm 2xl:text-md text-[var(--primary-colour)]">
              {file.name}
            </marquee>
          ) : (
            <h1 className="text-[var(--primary-colour)]">"Upload a Song"</h1>
          )}
          <p className="text-[var(--general-white)]/30 text-sm mt-2">
            {!file && " click and select a file (.mp3, wav format allowed)"}
          </p>

          {file && (
            <InputButtonFilled
              type="submit"
              disabled={loading}
              value={loading ? "Uploading..." : "Upload"}
            />
          )}
        </label>

        <input
          type="file"
          name="file"
          id="uploadFile"
          className="hidden"
          onChange={handleChange}
          accept=".mp3,.wav"
        />
      </form>
    </div>
      <MultipleSelectChip selected={selected} setSelected={setSelected} />
      </div>

{/* searching  */}
      <div className='mt-3'>
        <h2 className='text-[var(--general-white)] font-bold mb-2'>Search Song</h2>
          <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <div className='border justify-between flex w-full border-[var(--general-white)]/20 p-2 rounded-2xl bg-[var(--general-white)]/5'>
            <input type="text"  {...register('search', {minLength: {value: 5, message:"Write Minimum 5 Letters"}})} className='focus:outline-0 bg-transparent w-full text-[var(--general-white)]'/>
            <div className=' flex flex-col justify-end'>
            <InputButtonFilled text={"search"} type='submit'/>
            {errors.search && <p className='text-red-500 text-xs text-nowrap'>{errors.search.message}</p>}
            </div>
            </div>
          </form>
      </div>

{searchLoading ? 
<div className=' w-full h-48 flex justify-center items-center'> <LoaderSpinner/> </div> 
 :
 seachedResults &&
  <div className='h-52 overflow-scroll p-2 gap-2 flex flex-wrap border border-[var(--general-white)]/20 rounded-2xl mt-3'>
        {seachedResults && seachedResults.map(song => <AdminSearchCard song={song}/>)}
      </div>}
    

    
    </div>
  )
}

export default Admin
