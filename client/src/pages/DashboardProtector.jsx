
import { Container } from '../components'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router";
import { useEffect } from 'react'




function DashboardProtector() {
      const navigate = useNavigate()
const {isAuthenticated, user, userId, loading } = useSelector(
    (state) => state.auth  
  );

useEffect(() => {
  if(isAuthenticated == false && loading ==false || isAuthenticated ==false){
  navigate('/auth')

}

}, [isAuthenticated,loading])


  return (
  <Container>
   <Outlet/>
  </Container>
  )
}

export default DashboardProtector