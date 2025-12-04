import React from 'react'

function SongLoadingWaveSkeleton() {
  return (
  <div className="flex gap-1 items-center h-14 mt-5">
  {[...Array(30)].map((_, i) => (
    <span
      key={i}
      className="w-1 bg-[var(--primary-colour)] rounded animate-wave opacity-0"
      style={{ animationDelay: `${i * 0.1}s` }}
    ></span>
  ))}
</div>

  )
}

export default SongLoadingWaveSkeleton