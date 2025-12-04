import React from 'react'
import DefaultMusicImage from './DefaultMusicImage'
import { useNavigate } from 'react-router-dom'

function CategoryCard({ categoryName, imageUrl }) {
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate(`/dashboard/categories/${categoryName}`) 
  }

  return (
    <div
      className={`rounded-2xl overflow-hidden relative group cursor-pointer`}
      onClick={handleNavigation}
    >
      <div
        className="
          w-full h-full bg-[var(--general-black)]/40 absolute left-0 top-0
          backdrop-blur-sm items-center justify-center text-[var(--general-white)]
          text-sm opacity-0 flex
          transition-opacity duration-500 ease-in-out
          group-hover:opacity-100
          pointer-events-none group-hover:pointer-events-auto
        "
      >
        View
      </div>

      <img
        src={imageUrl || DefaultMusicImage}
        alt={categoryName}
        
        className="object-cover"
      />

      <span className="absolute left-2 bottom-2 backdrop-blur-md text-[var(--general-white)] bg-[var(--general-white)]/10 text-xs md:text-sm font-bold px-2 py-1 rounded-full">
        {categoryName}
      </span>
    </div>
  )
}

export default CategoryCard
