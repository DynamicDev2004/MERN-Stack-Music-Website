import React, { useEffect } from "react";
import gsap from "gsap";

function LoadingCard({loading}) {

useEffect(()=>{   
    if(loading) {
          gsap.to('#loadingCard',{
        top: 10
    })
    }
    else{
 gsap.to('#loadingCard',{
        top: -150
    })
    }
  
},[loading])
  return (
    <>
    <div className="absolute z-50 -top-36 left-0 w-full flex justify-center items-center pointer-none" id="loadingCard">
       
    <div className=" backdrop-blur-xl p-5 rounded-2xl border border-[var(--general-white)]/10 shadow-2xl relative">
     <button className="text-[var(--primary-colour)]/40 right-3 top-3 absolute cursor-pointer hover:text-[var(--primary-colour)]/100">
            <i className="fi fi-rr-cross-small"></i>
        </button>
         <h1 className="text-[var(--general-white)]">Loading</h1>
  
      <div className="w-[230px] h-1 bg-gray-200 overflow-hidden rounded mt-3">
       
        <div className="h-full bg-[var(--primary-colour)] animate-loading text-white"></div>
      </div>
      <p className="text-xs text-[var(--general-white)]/20 mt-3">Please do not refresh the page</p>
        </div>
        </div>
    </>
  );
}

export default LoadingCard;
