import React,{useId} from 'react'

function InputButtonFilled(
      {
    text,
    className = '',
        id,
    type = 'button',
    onClick = () => {},
    disabled = false,
    buttonType = 'input',
    ...props

  }
) 

{
  const genId = useId()
  return (
   <>
   
    <input type={type} id={id|| genId} value={text} disabled={disabled} className={`bg-[var(--primary-colour)]/30 text-white font-light text-xs 2xl:text-normal hover:cursor-pointer px-3 py-1 rounded-full border border-[#ffffff30] hover:border-[var(--primary-colour))] hover:bg-[var(--primary-colour)]/50 transition-colors duration-200 ${className}`} onClick={onClick} {...props}/>



   </>
  )
}

export default InputButtonFilled