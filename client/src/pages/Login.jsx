import React, { useState, useRef, useEffect } from "react";
import {Container, InputField, LogoEmblem, InputButtonFilled, LinkButtonStroke,   LoaderSpinner,} from "../components/index"; // Adjust the import path as necessary

import {useForm} from "react-hook-form";

import { googleLogin, loginUser } from "../features/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { useGoogleLogin } from '@react-oauth/google';
import { Link } from "react-router-dom";

function Login() {

  const {register, handleSubmit, formState: {errors}} = useForm()
  const {processing} = useSelector(state => state.auth)
 
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("Processing State:", processing);
  }
, [processing]);
  const onSubmit = (data) => {
   dispatch( loginUser(data))
  };

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
   
        <div className="flex flex-col gap-2 relative items-center justify-center p-4 py-7 bg-[#ffffff0c] rounded-2xl border border-[#ffffff15] w-[300px] md:w-[400px] 2xl:w-[500px] backdrop-blur-2xl ">
             <LogoEmblem  width={80}/>
               {processing && (
              <LoaderSpinner className={"absolute top-4 right-4"} size={30} />
            )}

            <h1 className="text-white text-xl font-semibold">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <InputField
            className={""}
            type="email"
            placeholder={"ahmed@gmail.com"}
            label={"Email"}
            row={false}
           {...register('email', {required: {value: true, message: "Email is required"}})}
           />
                 {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
     
          <InputField
            className={""}
            type="password"
            placeholder={"********"}
            label={"Password"}
            row={false}
            {...register('password', {required: {value :true, message:"Password is required"}})}
          />
          <div className=" grid grid-cols-2 w-full">
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          <Link to={'/auth/forget-password'} className={`text-white text-[8pt] font-light w-full pl-2 text-right ${errors.password? "col-span-1": "col-span-2"}`}>Forget Password</Link>
            {/* <p className={`text-white text-[8pt] font-light w-full pl-2 text-right  ${errors.password? "col-span-1": "col-span-2"}`}>Forgot Password?</p> */}
</div>
          <div className="flex mt-5 justify-center gap-3 w-full">
        
          <LinkButtonStroke text={"signup"}  path={'/auth/signup'}/>
          <InputButtonFilled text={"login"} type="submit"/>
          </div>

          </form>
            <p className="text-[#ffffff70] flex w-full text-nowrap items-center gap-2 my-5 text-xs font-light">
                <span className="h-[1px] block w-full bg-[#ffffff50]"></span>
                or continue with
                <span className="h-[1px] block w-full bg-[#ffffff50]"></span>
                </p>
          
     
                <div className="flex gap-2 items-center justify-center w-full">
                    <button onClick={handleGoogleLogin} className="flex cursor-pointer text-xs items-center justify-center gap-2 bg-[#ffffff0c] hover:bg-[#ffffff15] transition-colors duration-200 text-white 2xl:text-normal px-4 py-2 rounded-lg border border-[#ffffff30] hover:border-white">
                <i className="fi fi-brands-google mt-1"></i> Google
                </button>



                </div>
          
        </div>
      </div>


  );
}

export default Login;
