import { use, useEffect, useState } from 'react'

import Protector from './pages/Protector'
import { fetchUser } from './features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingScreen } from './components'
import Toast from './utils/Toast'

import { GoogleOAuthProvider } from '@react-oauth/google';
import useScreenSize from './utils/useScreenSize'
import { setShowQueue } from './features/songSlice'


function App() {
  const dispatch = useDispatch()
  const {loading } = useSelector(
    (state) => state.auth  
  );
  useEffect(() => {

   dispatch(fetchUser());

  }, [dispatch]);

  return (
    <>
<GoogleOAuthProvider clientId={"959798030129-81goher7vd2kgoj1k46crd2km8c1q9ve.apps.googleusercontent.com"}>
<Toast/>
 {loading? <LoadingScreen/> :   <Protector/>}

  </GoogleOAuthProvider>

  

    </>
  )
}

export default App
