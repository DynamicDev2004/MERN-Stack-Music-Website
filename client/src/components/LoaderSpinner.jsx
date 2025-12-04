import React from 'react'

function LoaderSpinner({className}) {
  return (
<div className={`flex justify-center items-center ${className}`}>
  <div className="loaderSpinner"></div>
</div>
  )
}

export default LoaderSpinner