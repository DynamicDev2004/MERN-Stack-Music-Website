import React from 'react'

function Container({children}) {
  return (
   <>
   <div className='relative overflow-y-hidden'>
       <div className='z-[2]'>

   {children}
   </div>


         <div className="flex flex-col items-center justify-center w-screen h-screen top-0 left-0 border-blue-800 absolute overflow-hidden -z-10">

<div className="absolute w-[230%] h-[230%] rounded-full overflow-hidden animate-rotate-pulse bg-black ">
  <div className="absolute inset-0 bg-gradient-to-r from-[var(--gradient-start-colour)] to-black"></div>
</div>

   </div>
   

   </div>
   </>

  )
}

export default Container