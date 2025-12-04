import React from 'react'
import { InputField, Container, InputButtonFilled, LogoEmblem, LinkButtonStroke } from '../components/index'
import { useForm } from 'react-hook-form'

import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { googleLogin } from "../features/authSlice.js";
import { showToast } from '../features/toastSlice.js';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true; 

function Signup() {

  const { register, handleSubmit,reset, formState: {errors}} = useForm()
  const navigate = useNavigate()
const dispatch = useDispatch()


async function registerUser(data) {
 try {
     const registerRequest = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`, data);
if(registerRequest.status === 200){
  reset()
  dispatch(showToast({message:"Registration Successful", type:"success", heading:"Success"}))
  navigate('/auth/login')
}
 } catch (error) {
   console.log(error)
   dispatch(showToast({message:error.response.data.message, type:"error", heading:"Failed"}))
 }
}

const handleSignup = (e)=>{

registerUser(e)
}
    
  const handleGoogleLogin = useGoogleLogin({
      onSuccess: async credentialResponse => {
        dispatch(googleLogin(credentialResponse))
  },
  onError: () => {
    console.log('Login Failed');
  },  
    flow: 'auth-code'
  })


  return (

      <div className="flex justify-center items-center h-screen">
   
        <div className="flex flex-col gap-2 items-center justify-center p-4 py-7 bg-[#ffffff0c] rounded-2xl border border-[#ffffff15] w-[340px] md:w-[400px] 2xl:w-[500px] backdrop-blur-2xl ">
             <LogoEmblem  width={80}/>
            <h1 className="text-white text-xl font-semibold">Register</h1>
       
 
    <form onSubmit={handleSubmit(handleSignup)} className="w-full">
        
<InputField
   placeholder={"ahmed"}
            label={"Name"}
            row={false}
type={"text"}
{...register('username', {required:{value: true, message:"Name is required"}})}
/>
{errors.name && <div  className="text-red-500 text-xs">{errors.name.message}</div>}


<InputField
   placeholder={"ahmed@company.com"}
            label={"Email"}
            row={false}
type={"email"}
{...register('email', {required:{value: true, message:"Email is required"}})}
/>
{errors.email && <div  className="text-red-500 text-xs">{errors.email.message}</div>}


<InputField
   placeholder={"•••••••••"}
            label={"Password"}
            row={false}
type={"password"}
{...register('password', {required:{value: true, message:"Password is required"}})}

/>
{errors.password && <div  className="text-red-500 text-xs">{errors.password.message}</div>}

<span {...register('theme',{value:1})}></span>



 <div className="flex mt-5 justify-center gap-3 w-full">
          <LinkButtonStroke text={"Login"} path={'/auth/login'}/>
          <InputButtonFilled text={"Confirm"} type="submit"/>
          </div>
    </form>






            <p className="text-[#ffffff70] flex w-full text-nowrap items-center gap-2 my-5 text-xs font-light">
                <span className="h-[1px] block w-full bg-[#ffffff50]"></span>
                or continue with
                <span className="h-[1px] block w-full bg-[#ffffff50]"></span>
                </p>

               

            {/* google signin option */}
                <div className="flex gap-2 items-center justify-center w-full">
                 
                    <button onClick={handleGoogleLogin} className="flex cursor-pointer text-xs items-center justify-center gap-2 bg-[#ffffff0c] hover:bg-[#ffffff15] transition-colors duration-200 text-white 2xl:text-normal px-4 py-2 rounded-lg border border-[#ffffff30] hover:border-white">
                <i className="fi fi-brands-google mt-1"></i> Google
                </button>
                </div>

                   <p className="text-[#ffffff70] mt-4 flex w-full  text-center items-center gap-2 text-xs font-light">
               
                By sign up, I state that I have read and understood the terms and conditions.
               
                </p>
          
        </div>
      </div>
    
    

  )

}

export default Signup