import axios from "axios";

axios.defaults.withCredentials = true; 

// async function getCurrentUser() {
    

//   try {
//    let user =  await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/getUser`);
//   console.log(user.data)
//    return user.data;
    
//   } catch (error) {
//     if(error.status === 401) return error.status
//   }
   
// }


// async function login(data) {
// try {
//      const loginRequest = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`, data);

//      console.log(loginRequest);
// } catch (error) {
//   console.log(error.response.data.message)
// }
// }
async function updateUser(data) {
   const updateRequest = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/updateUser`, data);
  console.log(updateRequest.status)
}

 async function logoutReq() {
  
   await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/logout`);

}

export {logoutReq, updateUser};