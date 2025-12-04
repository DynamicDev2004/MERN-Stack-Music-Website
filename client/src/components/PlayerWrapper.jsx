import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { useSelector, useDispatch } from 'react-redux';
import { nextSong, setIsLoading, setIsPlaying, setLoop, setVolume } from '../features/songSlice';
import HoverPlugin from 'wavesurfer.js/dist/plugins/hover.js';

export default function PlayerWrapper({height = 70 }) {
    const dispatch = useDispatch();
  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);
  const audioUrl = useSelector(state => state.song.currentSong ? `${import.meta.env.VITE_BASE_URL}/${state.song.currentSong.destination}` : null);
  const {isPlaying, playlist, volume, loop, waveContainer, isLoading, currentIndex, showMiniplayer} = useSelector(state => state.song);
  const {theme} = useSelector(state=>state.theme)
  const loopRef = useRef(loop ||false);

useEffect(()=>{
  loopRef.current = loop;
},[loop])

useEffect(() => {

    if (wavesurferRef.current) {
        if (isPlaying) {
            wavesurferRef.current.play();
           
        } else {
            wavesurferRef.current.pause();
        }
    }
}, [isPlaying]);

useEffect(()=> {

    if (wavesurferRef.current) {
        const waveColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-colour');
        const progressColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-second-colour');  
        wavesurferRef.current.setOptions({
            waveColor: waveColor,
            progressColor: progressColor,
        });
         wavesurferRef.current.setVolume(volume)
    }
}, [theme, volume, loop])
  useEffect(() => {
   
    if (!containerRef.current) return;
  
    if(showMiniplayer){
    const ws = WaveSurfer.create({
      container: '#waveContainer',
      waveColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-colour') || '#ccc',
      progressColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-second-colour') ,
      cursorColor: '#111',
      height,
      barWidth: 1,
      barGap: 2,
      normalize: true,
      responsive: true,
      
      plugins: [
        HoverPlugin.create({
          labelColor: '#fff',
          lineColor: '#fff',
          playOnHover: false,
          height: 10,
          labelBackground: 'rgba(0, 0, 0, 0.8)',
          lineWidth:2
        }),
       
      ],
    });

    wavesurferRef.current = ws;
    wavesurferRef.current.setVolume(volume)
    ws.on('ready', () => {
      ws.play();
          dispatch(setIsLoading(false));
    });

    ws.on('finish',()=>{
        if(loopRef.current === false){

         if (currentIndex + 1  === playlist.length) {
             dispatch(setIsPlaying(false));
            ws.seekTo(0);
            ws.pause();
         }
         else{
          dispatch(nextSong())
          }
        }
        if(loopRef.current === true){
            ws.seekTo(0);
            ws.play();
            dispatch(setIsPlaying(true));
        }
    })

  

    ws.on('error', (err) => {
            dispatch(setIsLoading(false));
});
ws.on('loading', (percent) => {
    
   if(percent === 100) {
    dispatch(setIsLoading(false));
   }
});
    if (audioUrl) {
           dispatch(setIsLoading(true));
        ws.load(audioUrl);
    }
    return () => {
      ws.destroy();
      wavesurferRef.current = null;
    };

}

  }, [audioUrl, height]);



  return (
    <div className="waveplayer">
      <div ref={containerRef} />
    </div>
  );
}
