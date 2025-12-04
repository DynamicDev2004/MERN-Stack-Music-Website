import React from 'react'
import { Link } from 'react-router-dom'

function CategoryMiniCard({title, image}) {

  return (
    <Link to={title.toLowerCase()}> 
    <div className='border cursor-pointer relative rounded-2xl flex items-center justify-center  w-42 overflow-hidden hover:border-[var(--primary-colour)]/80 transition bg-gradient-to-b from-[var(--primary-colour)]/20 to-transparent hover:from-[var(--primary-colour)]/50'>
<h2 className='text-[var(--general-white)] text-sm font-semibold absolute z-10 lg:text-md 2xl:text-2xl'>{title}</h2>
       <img src={image} className={`object-cover opacity-5`} alt="" />

    </div>
    </Link>
  )
}

export default CategoryMiniCard