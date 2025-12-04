import React from "react";

function SongListCardSkeleton() {
  return (
    <div className="relative w-full">
      <div
        className="flex items-center backdrop-blur-2xl rounded-xl p-2 justify-between my-2 
        cursor-pointer transition-all duration-500 ease-in-out relative z-10 "
      >
        {/* Thumbnail skeleton */}
        <div className="flex">
          <div className="w-14 h-14 rounded-lg bg-[var(--general-black)]/10 relative overflow-hidden">
            <div
              className="absolute inset-0 animate-pulse bg-gradient-to-r 
                from-[var(--primary-colour)]/50 to-[var(--general-black)]/10 rounded-lg"
            ></div>
          </div>

          {/* Text placeholders */}
          <span className="pl-3 flex flex-col gap-1">
            <div className="h-3 w-28 rounded bg-[var(--general-black)]/10 overflow-hidden relative">
              <div
                className="absolute inset-0 animate-pulse bg-gradient-to-r 
                  from-[var(--primary-colour)]/50 to-[var(--general-black)]/10"
              ></div>
            </div>

            <div className="h-2 w-20 rounded bg-[var(--general-black)] overflow-hidden relative">
              <div
                className="absolute inset-0 animate-pulse bg-gradient-to-r 
                  from-[var(--primary-colour)]/40 to-[var(--general-black)]"
              ></div>
            </div>

            <div className="h-2 w-12 rounded bg-[var(--general-black)] overflow-hidden relative">
              <div
                className="absolute inset-0 animate-pulse bg-gradient-to-r 
                  from-[var(--primary-colour)]/30 to-[var(--general-black)]"
              ></div>
            </div>
          </span>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-4 pr-3">
          <div className="w-5 h-5 rounded-full bg-[var(--general-black)] relative overflow-hidden">
            <div
              className="absolute inset-0 animate-pulse bg-gradient-to-r 
                from-[var(--primary-colour)]/40 to-[var(--general-black)]/10 rounded-full"
            ></div>
          </div>

          <div className="w-9 h-9 rounded-full bg-[var(--general-black)] relative overflow-hidden">
            <div
              className="absolute inset-0 animate-pulse bg-gradient-to-r 
                from-[var(--primary-colour)]/40 to-[var(--general-black)]/10 rounded-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongListCardSkeleton;
