import React, {useEffect, useState} from 'react'

function useScreenSize() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
      const handleResize = () => {
        const checkResize = window.innerWidth < 768;
        setIsMobile(checkResize);
      };
      window.addEventListener('resize', handleResize);
 return () => window.removeEventListener('resize', handleResize);

  },[])
  return isMobile
}

export default useScreenSize