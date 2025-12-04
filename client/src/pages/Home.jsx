import React, { useEffect, useState } from "react";
import { CategoryCard, SongListCard } from "../components/index.js";
import { fetchHistory } from "../features/songsDataSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "../features/songSlice.js";
import SongListCardSkeleton from "../components/skeleton/SongListCardSkeleton.jsx";

function Home() {
  const { historySongs, isLoading } = useSelector((state) => state.songsData);
  const [songHistory, setsongHistory] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  useEffect(() => {
console.log(historySongs)

const recentSongs = historySongs.map(e => ({
    ...e,    
    visibility: "recent" 
}));


      setsongHistory(recentSongs);
    

    

  }, [historySongs]);

//   useEffect(()=>{
//     console.log(isLoading)
// if(isLoading == false){

//   if(songHistory.length >= 0){
//     console.log("DATA",songHistory)
//   dispatch(setPlaylist(songHistory))
//   }
// }
//   },[isLoading, historySongs, dispatch])

  const headingStyling =
    "text-[var(--general-white)] text-sm 2xl:text-md font-bold 2xl:text-lg";

  return (
    <div className="p-2 md:p-5">
      <span className={`${headingStyling}`}>Categories</span>
      <div className="grid grid-cols-3 gap-4 py-3">
        <CategoryCard
          imageUrl="https://i.pinimg.com/736x/e3/54/84/e354848c24d963cf8dbfae4117da6d4f.jpg"
          categoryName="Lofi"
        />
        <CategoryCard
          imageUrl="https://media.istockphoto.com/id/2155865508/video/creative-rap-artist-performing-a-hit-song-on-stage-with-a-striking-female-dancer-inspiring-a.jpg?s=640x640&k=20&c=yKweBrz_urc5XNsOeg4MsAP0ucVPmovYjnXTC-2MtcQ="
          categoryName="Rap"
        />
        <CategoryCard
          imageUrl="https://pixelsao.com/wp-content/uploads/2020/09/anomalia.jpg"
          categoryName="Mashup"
        />
      </div>

      <span className={`${headingStyling}`}>Recent Songs</span>

      {isLoading ? (
     <div>
      <SongListCardSkeleton/>
      <SongListCardSkeleton/>
      <SongListCardSkeleton/>
      <SongListCardSkeleton/>
     </div>
      ) : (
        songHistory.map((song) => (
          <SongListCard SongDetails={song} key={song._id}/>
        ))
      )}
    </div>
  );
}

export default Home;
