import React from "react";

function LoadingScreen() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen relative overflow-hidden">
       







          <div>
            {/* <span className="w-[180px] block h-[200px] blur-[130px] animate-spin-slow  -bottom-38 -left-0  md:w-[260px] md:h-[350px] md:blur-[250px] lg:w-[400px] lg:h-[400px] lg:blur-[300px] 2xl:w-[380px] 2xl:h-[430px] 2xl:blur-[300px]  duration-[10s]  bg-gradient-to-r from-[var(--gradient-start-colour)] to-[var(--gradient-end-colour)] absolute rounded-full "></span>
            <span className="w-[180px] block h-[200px] blur-[130px] animate-spin-slow  -top-38 -right-10 md:w-[260px] md:h-[350px] md:blur-[250px] lg:w-[400px] lg:h-[400px] lg:blur-[300px] 2xl:w-[380px] 2xl:h-[430px] 2xl:blur-[300px] duration-[10s]  bg-gradient-to-r from-[var(--gradient-start-colour)] to-[var(--gradient-end-colour)] absolute rounded-full"></span> */}

            <div className="loader">
              <div className="l"></div>
              <div className="l"></div>
              <div className="l"></div>
              <div className="l"></div>
              <div className="l"></div>
              <div className="l"></div>
              <div className="l"></div>
              <div className="l"></div>
              <div className="l"></div>
            </div>
          </div>
          <p className="absolute text-white bottom-10 font-primary font-extralight">
            Loading...
          </p>
     
      </div>
    </>
  );
}

export default LoadingScreen;
