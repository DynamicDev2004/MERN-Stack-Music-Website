import {
  LogoHorizontal,
  Sidebar,
  ActiveSongMiniCard,
  SongControlsWindow,
  LogoEmblem,
} from "../components/index.js";
import { Navigation } from "../components/index.js";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import PlayerWrapper from "../components/PlayerWrapper.jsx";
import WaveExtention from "../components/WaveExtention.jsx";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar.jsx";

function Dashboard({ backgroundImage }) {
  const [showcontrols, setshowcontrols] = useState(false);
  const { currentSong } = useSelector((state) => state.song);
  const { user } = useSelector((state) => state.auth);
  const toggleControls = () => {
    setshowcontrols(!showcontrols);
  };
  
  return (
    <>
      <div className="w-screen h-screen max-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-between py-3 px-5">
          <div className="md:hidden">
          <LogoEmblem width={35}/>
          </div>
          <div className="hidden md:block">
          <LogoHorizontal width={120} />
          </div>
          <div className="flex items-center">
          {<SearchBar />}
       
            <div className="mb-1 md:hidden">
              <li className={`flex items-center justify-between gap-5`}>
                <div className="flex md: ml-5 items-center text-[var(--general-white)]/30 text-xs font-light hover:text-[var(--general-white)] rounded-lg cursor-pointer transition-all duration-200 ease-in-out gap-2">
                  <span className="w-7 h-7 rounded-full block overflow-hidden">
                    <NavLink
                      to={"/dashboard/settings"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[var(--general-white)]/100"
                          : "text-[var(--general-white)]/30"
                      }
                    >
                      <img
                        src={
                          user?.provider == "google"
                            ? `${user?.userMetaData?.profile_Image}`
                            : `${import.meta.env.VITE_BASE_URL}${
                                user?.userMetaData?.profile_Image
                              }` || ""
                        }
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </NavLink>
                  </span>
                </div>
              </li>
            </div>
       
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-[92%] w-screen gap-4 flex-1 px-2 pb-2 md:px-5 md:pb-5">
          <div
            className={` bg-[var(--general-white)]/3 w-full md:max-w-[190px] max-h-max sm:h-full flex-1 rounded-3xl sm:py-3 ${
              backgroundImage || "backdrop-blur-3xl"
            }`}
          >
            <Navigation />
          </div>

          <div
            className={`overflow-hidden bg-[var(--general-white)]/3  flex-2 rounded-3xl ${
              backgroundImage || ""
            } relative`}
          >
            <PlayerWrapper />
            {currentSong ? (
              <ActiveSongMiniCard
                onClickFn={() => {
                  setshowcontrols(true);
                }}
                isActive={!showcontrols}
              />
            ) : null}
            <SongControlsWindow
              isActive={showcontrols}
              backBtnFn={toggleControls}
            />
            <div className="flex-1 overflow-y-scroll no-scrollbar h-[100%]">
              <Outlet />
            </div>
          </div>
          <div
            className={`h-full bg-[var(--general-white)]/3  hidden xl:block max-w-[300px] ${
              showcontrols ? "opacity-30" : "opacity-100"
            } transition duration-700  flex-1 rounded-3xl overflow-hidden  ${
              backgroundImage || "backdrop-blur-3xl"
            }`}
          >
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
