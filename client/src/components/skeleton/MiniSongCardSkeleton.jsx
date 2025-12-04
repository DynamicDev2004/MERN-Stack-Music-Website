import React from "react";

function MiniSongCardSkeleton() {
  return (
    <div
      className="p-2 my-2 rounded-2xl border border-[var(--general-white)]/5 
      hover:border-[var(--general-white)]/70 transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Thumbnail skeleton */}
          <div className="w-14 h-14 rounded-lg bg-[var(--general-black)]/10 relative overflow-hidden">
            <div
              className="absolute inset-0 animate-pulse bg-gradient-to-r 
              from-[var(--primary-colour)]/40 to-[var(--general-black)]/10 rounded-lg"
            ></div>
          </div>

          {/* Text placeholders */}
          <div className="pl-3 flex flex-col gap-1">
            <div className="h-3 w-28 rounded bg-[var(--general-black)]/10 relative overflow-hidden">
              <div
                className="absolute inset-0 animate-pulse bg-gradient-to-r 
                from-[var(--primary-colour)]/50 to-[var(--general-black)]/10"
              ></div>
            </div>

            <div className="h-2 w-20 rounded bg-[var(--general-black)]/10 relative overflow-hidden">
              <div
                className="absolute inset-0 animate-pulse bg-gradient-to-r 
                from-[var(--primary-colour)]/40 to-[var(--general-black)]/10"
              ></div>
            </div>

            <div className="h-2 w-12 rounded bg-[var(--general-black)]/10 relative overflow-hidden">
              <div
                className="absolute inset-0 animate-pulse bg-gradient-to-r 
                from-[var(--primary-colour)]/30 to-[var(--general-black)]/10"
              ></div>
            </div>
          </div>
        </div>

        {/* Play icon skeleton */}
        <div className="w-9 h-9 rounded-full bg-[var(--general-black)]/20 relative overflow-hidden">
          <div
            className="absolute inset-0 animate-pulse bg-gradient-to-r 
            from-[var(--primary-colour)]/40 to-[var(--general-black)]/10 rounded-full"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default MiniSongCardSkeleton;
