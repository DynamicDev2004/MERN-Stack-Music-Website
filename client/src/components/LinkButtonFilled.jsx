import React from 'react'
import { Link } from 'react-router-dom'

function LinkButtonFilled(
      {
    text,
    className,
    type = 'button',
    onClick = () => {},
    disabled = false,
    buttonType = 'input',
    path,
    ...props

  }
) 

{

  return (
   <>
   
    <Link type={type} to={path}  disabled={disabled} className={`bg-[var(--primary-colour)]/30 text-white font-light text-xs 2xl:text-normal hover:cursor-pointer px-3 py-1 rounded-full border border-[#ffffff30] hover:border-[var(--primary-colour))] hover:bg-[var(--primary-colour)]/50 transition-colors duration-200 ${className}`} onClick={onClick} {...props}>
    {text}
    </Link>



   </>
  )
}

export default LinkButtonFilled