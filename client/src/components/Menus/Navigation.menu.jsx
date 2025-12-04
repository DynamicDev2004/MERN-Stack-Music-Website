import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Navigation() {
  const listStyling =
    " text-xs font-light px-5 py-3 hover:text-[var(--general-white)] rounded-lg cursor-pointer transition-all duration-200 ease-in-out list-none flex items-center gap-2";
    const {isAdmin, user} = useSelector(state => state.auth)
    // console.log(`${import.meta.env.VITE_BASE_URL}${user.userMetaData.profile_Image}`)
  return (
 <>
    <div className="hidden sm:flex flex-col justify-between h-full overflow-scroll">
      <div>
        <NavLink
          to={"home"}
          className={({ isActive }) =>
            isActive
              ? "text-[var(--general-white)]/100"
              : "text-[var(--general-white)]/30"
          }
        >
   
          <li className={`${listStyling}`}>
            <i className="fi fi-sr-home mt-1"></i>Home
          </li>
        </NavLink>
        <NavLink
          to={"/dashboard/explore"}
          className={({ isActive }) =>
            isActive
              ? "text-[var(--general-white)]/100"
              : "text-[var(--general-white)]/30"
          }
        >
   
          <li className={`${listStyling} `}>
            <i className="fi fi-rr-list mt-1"></i>Explore
          </li>
        </NavLink>

        <NavLink
          to={"/dashboard/favourite"}
          className={({ isActive }) =>
            isActive
              ? "text-[var(--general-white)]/100"
              : "text-[var(--general-white)]/30"
          }
        >
  
          <li className={`${listStyling} `}>
            <i className="fi fi-rr-heart mt-1"></i>Favourite
          </li>
        </NavLink>

        <NavLink
          to={"/dashboard/categories"}
          className={({ isActive }) =>
            isActive
              ? "text-[var(--general-white)]/100"
              : "text-[var(--general-white)]/30"
          }
        >

          <li className={`${listStyling} `}>
            <i className="fi fi-rr-category mt-1"></i>Categories
          </li>
        </NavLink>

        <NavLink
          to={"/dashboard/library"}
          className={({ isActive }) =>
            isActive
              ? "text-[var(--general-white)]/100"
              : "text-[var(--general-white)]/30"
          }
        >
       
          <li className={`${listStyling} `}>
            <i className="fi fi-rr-folder mt-1"></i>My Library
          </li>
        </NavLink>

        <NavLink
          to={"/dashboard/playlists"}
          className={({ isActive }) =>
            isActive
              ? "text-[var(--general-white)]/100"
              : "text-[var(--general-white)]/30"
          }
        >
      
          <li className={`${listStyling} `}>
            <i className="fi fi-rr-list-music mt-1"></i>My Playlists
          </li>
        </NavLink>
      </div>

      <div className="">
        <li className={`flex items-center justify-between px-5`}>
          <div className="flex items-center text-[var(--general-white)]/30 text-xs font-light py-3 hover:text-[var(--general-white)] rounded-lg cursor-pointer transition-all duration-200 ease-in-out gap-2">
            <span className="w-10 h-10 rounded-full block overflow-hidden">
              <img
                src={user?.provider=="google"? `${user?.userMetaData?.profile_Image}` : `${import.meta.env.VITE_BASE_URL}${user?.userMetaData?.profile_Image}` || ""}
                alt=""
                className="object-cover w-full h-full"
              />
            </span>
           {user?.username?.slice(0,8)+'...'}
          </div>
          <NavLink to={"/dashboard/settings"}    className={({ isActive }) =>
            isActive
              ? "text-[var(--general-white)]/100"
              : "text-[var(--general-white)]/30"
          }>
            <i className="fi fi-rr-settings  hover:text-[var(--general-white)] hover:cursor-pointer "></i>
          </NavLink>
          {isAdmin && 
          <NavLink to={"/dashboard/admin"}    className={({ isActive }) =>
            isActive
              ? "text-[var(--general-white)]/100"
              : "text-[var(--general-white)]/30"
          }>
            <i className="fi fi-rr-key  hover:text-[var(--general-white)] hover:cursor-pointer "></i>
          </NavLink>
          }
        </li>
      </div>
    </div>



    {/* MOBILE NAVIGATION */}
      <div className="flex sm:hidden items-center justify-between overflow-scroll no-scrollbar">
      <div className="flex justify-between w-full">
        <NavLink
          to={"home"}
          className={({ isActive }) =>
            isActive
              ? "text-[var(--general-white)]/100"
              : "text-[var(--general-white)]/30"
          }
        >
   
          <li className={`${listStyling}`}>
            <i className="fi fi-sr-home mt-1"></i>
          </li>
        </NavLink>
        <NavLink
          to={"/dashboard/explore"}
          className={({ isActive }) =>
            isActive
              ? "text-[var(--general-white)]/100"
              : "text-[var(--general-white)]/30"
          }
        >
   
          <li className={`${listStyling} `}>
            <i className="fi fi-rr-list mt-1"></i>
          </li>
        </NavLink>

        <NavLink
          to={"/dashboard/favourite"}
          className={({ isActive }) =>
            isActive
              ? "text-[var(--general-white)]/100"
              : "text-[var(--general-white)]/30"
          }
        >
  
          <li className={`${listStyling} `}>
            <i className="fi fi-rr-heart mt-1"></i>
          </li>
        </NavLink>

        <NavLink
          to={"/dashboard/categories"}
          className={({ isActive }) =>
            isActive
              ? "text-[var(--general-white)]/100"
              : "text-[var(--general-white)]/30"
          }
        >

          <li className={`${listStyling} `}>
            <i className="fi fi-rr-category mt-1"></i>
          </li>
        </NavLink>

        <NavLink
          to={"/dashboard/library"}
          className={({ isActive }) =>
            isActive
              ? "text-[var(--general-white)]/100"
              : "text-[var(--general-white)]/30"
          }
        >
       
          <li className={`${listStyling} `}>
            <i className="fi fi-rr-folder mt-1"></i>
          </li>
        </NavLink>

        <NavLink
          to={"/dashboard/playlists"}
          className={({ isActive }) =>
            isActive
              ? "text-[var(--general-white)]/100"
              : "text-[var(--general-white)]/30"
          }
        >
      
          <li className={`${listStyling} `}>
            <i className="fi fi-rr-list-music mt-1"></i>
          </li>
        </NavLink>
      </div>

 
    </div>
 </>
  );
}

export default Navigation;
