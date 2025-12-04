import React, { useState, useEffect, useRef } from "react";
import { DefaultMusicImage, LoaderSpinner } from "./index.js";
import { formatDuration } from "../utils/durationConverter.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentSong,
  setIsPlaying,
  setPlaylist,
  setWaveContainer,
} from "../features/songSlice.js";
function MiniSongCard({ song, playlist }) {

  const dispatch = useDispatch();
  const { currentSong, isPlaying, isLoading } = useSelector(
    (state) => state.song
  );
  const [spinner, setSpinner] = useState(false);
  const iconref = useRef();
  useEffect(() => {
    iconref.current.classList.replace("fi-rr-pause", "fi-rr-play");
    if (currentSong && currentSong._id === song._id) {
      if (isLoading) {
        setSpinner(true);
      } else {
        setSpinner(false);
        if (isPlaying) {
          iconref.current.classList.replace("fi-rr-play", "fi-rr-pause");
        } else {
          iconref.current.classList.replace("fi-rr-pause", "fi-rr-play");
        }
      }
    } else {
      setSpinner(false);
    }
  }, [currentSong, isPlaying, isLoading]);

  return (
    <div
      className={`p-2 my-2 rounded-2xl border border-[var(--general-white)]/5 hover:border-[var(--general-white)]/70 transition-all `}
    >
      <div className=" flex items-center justify-between">
        <div className="flex">
          <div className="block overflow-hidden w-14 h-14 rounded-lg">
            <DefaultMusicImage />
          </div>
          <span className="pl-3 text-[var(--general-white)] flex flex-col">
            <h2 className="text-xs 2xl-text-sm font-semibold">
              {song.name.slice(0, 15)}...
            </h2>
            <h3 className="text-xs font-light text-[var(--general-white)]/40">
              {song.album}
            </h3>
            <h4 className="text-xs font-light text-[var(--general-white)]">
              {formatDuration(song.duration)}
            </h4>
          </span>
        </div>
        <div
          onClick={() => {
            if (currentSong && currentSong._id === song._id) {
              dispatch(setIsPlaying(!isPlaying));
          
            } else {
              dispatch(setCurrentSong(song));
              dispatch(setIsPlaying(true));
              dispatch(setWaveContainer("#waveContainer"));
              dispatch(setPlaylist(playlist));
            }
          }}
          className="relative w-9 h-9 flex items-center justify-center
    transition-all duration-300 ease-in-out cursor-pointer group"
        >
          {spinner && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoaderSpinner />
            </div>
          )}

          <i
            id={`icon-${song._id}`}
            ref={iconref}
            className="fi fi-rr-play text-[var(--general-white)]/40 
      group-hover:text-[var(--general-white)] mt-1 text-md"
          ></i>
        </div>
      </div>
    </div>
  );
}

export default MiniSongCard;
