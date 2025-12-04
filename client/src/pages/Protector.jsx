
import { Container } from '../components'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router";
import { useEffect, useState } from 'react'

function Protector() {
  const navigate = useNavigate()
const {isAuthenticated, user, userId, loading, isAdmin} = useSelector(
    (state) => state.auth  
  );




useEffect(() => {
  if(isAuthenticated == true && loading == false){
    console.log("TRUE1")
  if (location.pathname.startsWith("/auth")) {
        navigate("/dashboard", { replace: true })
            console.log("TRUE2")
      }
  else if (location.pathname.includes("/admin") && isAdmin ==false) {
        navigate("/dashboard", { replace: true })
      }
}
   

}, [isAuthenticated,loading, isAdmin])


  return (

  <Container>
   <Outlet/>
  </Container>
  )
  
}

export default Protector