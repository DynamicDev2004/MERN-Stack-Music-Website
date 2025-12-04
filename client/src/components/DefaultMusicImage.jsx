import React from 'react'

function DefaultMusicImage() {
  return (
    <div className='border border-[var(--primary-colour)]/50 rounded-xl bg-gradient-to-r p-2 from-[var(--gradient-start-colour)]/50 to-[var(--gradient-end-colour)]/10'>
        <img src="/assets/default-playback-Image/defaultMusicImage.svg" alt="" className='opacity-75'/>
    </div>
  )
}

export default DefaultMusicImage