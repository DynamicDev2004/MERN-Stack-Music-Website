import React, {useId} from 'react'

function InputButtonStroke(
  {
    text,
    className = '',
    id,
    type = "button",
    onClick = () => {},
    disabled = false,
    ...props
  }
) 

{
  const genId = useId()
  return (

   
    <input type={type} id={id|| genId} onClick={onClick} value={text}  disabled={disabled} className={`bg-[#ffffff15]  text-white font-light text-xs 2xl:text-normal hover:cursor-pointer px-3 py-1 rounded-full border border-[#ffffff30] hover:bg-[#ffffff2c] hover:border-white w-fit transition-colors duration-200 ${className}`} {...props}/>



  )
}

export default InputButtonStroke