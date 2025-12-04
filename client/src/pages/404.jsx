import React from 'react'
import { LinkButtonStroke } from '../components'

function NotFound() {
  return (
    <div className='w-screen gap-5 flex-col h-screen flex items-center justify-center '>
   <h1 className='text-6xl text-[var(--primary-colour)]'>404</h1>
   <p className='text-[var(--general-white)]/50'>You have hit the wrong path. Please stay within the APP.</p>
   <LinkButtonStroke text={'Home'} path={'/dashboard/home'}/>
        </div>
  )
}

export default NotFound