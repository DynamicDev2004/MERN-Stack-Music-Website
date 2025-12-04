import React from 'react'
import { Link } from 'react-router-dom'

function LinkButtonStroke(
  {
    text,
    className,
    onClick = () => {},
    disabled = false,
    path,
    ...props
  }
) {
  return (
   <>
   
    <Link onClick={onClick} to={path} disabled={disabled} className={`bg-[#ffffff15] text-white font-light text-xs 2xl:text-normal hover:cursor-pointer px-3 py-1 rounded-full border border-[#ffffff30] hover:bg-[#ffffff2c] hover:border-white transition-colors duration-200 ${className}`} {...props}>
      {text}
    </Link>

   </>
  )
}

export default LinkButtonStroke