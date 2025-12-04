import React from "react";
import axios from "axios";
import {
  InputButtonFilled,
  InputButtonStroke,
  LoadingScreen,
  SongListCard,
} from "../components";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../features/toastSlice";
import { setUserLibSongs } from "../features/songsDataSlice";
import SongListCardSkeleton from "../components/skeleton/SongListCardSkeleton";


function Library() {
  const headingStyling =
    "text-[var(--general-white)] text-sm 2xl:text-md font-bold 2xl:text-lg";

  const [songs, setSongs] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFile(e.target.files[0] || null);
 
  };

  const fetchSongs = async () => {

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/request/getUserSongs`,
        { withCredentials: true }
      );

      setSongs(res.data.data);
      dispatch(setUserLibSongs(res.data.data))

return res.data.data
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

    }
  };

  useEffect( () => {
    setLoading(true);
     fetchSongs();
    

  }, []);

  const deleteSong = async (id) => {
    try {
       dispatch(showToast({message:"Deleting a Song", type:"success", heading:"In Progress"}))
      setProcessing(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/delete/userLib`,
        { withCredentials: true, data: id }
      );
      if (res.status === 200) {
        fetchSongs();
        dispatch(showToast({message:"1 Song deleted", type:"success", heading:"Successful"}))
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setProcessing(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/uploads/private`,
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
      console.log(err.response.data.message);
    } finally {
      setProcessing(false);
    }

    await fetchSongs();
  };

  return (

    <div className="p-5 h-full overflow-x-hidden">

      <div className="flex justify-between items-center">
        <h2 className={headingStyling}>Your Songs</h2>

        {songs.length != 0 ? (
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col justify-center items-center"
          >
            <label
              htmlFor="uploadFile"
              className=" flex justify-center gap-2 items-center cursor-pointer"
            >
              {file ? (
                <marquee className="max-w-[140px] border p-1 border-[var(--general-white)]/10 rounded-full text-xs 2xl:text-md text-[var(--primary-colour)]">
                  {file.name}
                </marquee>
              ) : (
                <h1 className={`bg-[#ffffff15]  text-white font-light text-xs 2xl:text-normal hover:cursor-pointer px-3 py-1 rounded-full border border-[#ffffff30] hover:bg-[#ffffff2c] hover:border-white w-fit transition-colors duration-200 `}>
                  Upload a Song
                </h1>
       
              )}
            

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
        ) : null}
      </div>
      {loading ? (
           <div>
      <SongListCardSkeleton/>
      <SongListCardSkeleton/>
      <SongListCardSkeleton/>
      <SongListCardSkeleton/>
     </div>
      ) : songs.length <= 0 ? (
        <EmptyLibUI />
      ) : (
        songs.map((item) => (

          <SongListCard
            SongDetails={item}
            key={item._id}
            deleteFn={() => deleteSong(item._id)}
            allowDelete={true}
          />
        ))
      )}
    </div>
  );

  function EmptyLibUI() {
    return (
      <form
        onSubmit={handleSubmit}
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
    );
  }
}

export default Library;
