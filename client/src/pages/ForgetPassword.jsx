import React, { useState, useRef, useEffect } from "react";
import {
  InputField,
  LogoEmblem,
  InputButtonFilled,
  LoaderSpinner,
} from "../components/index"; // Adjust the import path as necessary

import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";

import axios from "axios";
import { showToast } from "../features/toastSlice.js";
import { Link, useNavigate } from "react-router-dom";

function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerUpdatePassword,
    handleSubmit: handleUpdatePassword,
    watch: watchUpdatePassword,
    formState: { errors: updatePasswordErrors },
  } = useForm();

  const [authenticated, setAuthenticated] = useState(false);
  const [verification, setVerification] = useState(false);
  const [targetEmail, setTargetEmail] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [disableResendOTP, setDisableResendOTP] = useState(true);

  const inputs = useRef([]);
  const password = watchUpdatePassword("password");

  const navigate = useNavigate()
  useEffect(() => {
    console.log(password)
  }, [password])
  
  useEffect(() => {
    if (!disableResendOTP) return; 

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setDisableResendOTP(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disableResendOTP]);

  const handleResend = async () => {
    setDisableResendOTP(true);
    setTimer(60);

    try {
      onSubmit({ email: targetEmail });
    } catch (error) {
      setDisableResendOTP(false);
      setTimer(0);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) {
      e.target.value = "";
      return;
    }
    const otpValues = inputs.current.map((input) => input.value || "");
    setOtp(otpValues.join(""));

    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const email = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/forget-password?email=${
          data.email
        }`
      );
      if (email.status === 200) {
        setAuthenticated(true);
        setTargetEmail(data.email);
        dispatch(
          showToast({
            message: "4 digit OTP sent to your email",
            type: "success",
            heading: "OTP Sent",
          })
        );
      }
    } catch (error) {
      if (error.response.status === 400) {
        dispatch(
          showToast({
            message: "Cannot reset password for Google Authenticated Users",
            type: "error",
            heading: "Not Allowed",
          })
        );
      }
      if (error.response.status === 404) {
        dispatch(
          showToast({
            message: "Email not found",
            type: "error",
            heading: "Invalid Email",
          })
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOTP = async () => {
    if (otp.length === 4) {
      try {
        setLoading(true);
        const verifyOtp = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/v1/auth/forget-password`,
          { email: targetEmail, otp }
        );
        if (verifyOtp.status === 200) {
          setVerification(true);
        }
      } catch (error) {
        if (error.response.status === 400) {
          dispatch(
            showToast({
              message: "Invalid OTP. Please try again.",
              type: "error",
              heading: "OTP Verification Failed",
            })
          );
        }
      } finally {
        setLoading(false);
      }
    } else {
      dispatch(
        showToast({
          message: "Please enter 4 digits OTP",
          type: "error",
          heading: "Invalid OTP",
        })
      );
    }
  };

  const updatePassword = async (data) => {
    setLoading(true);
try {
     const update = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/reset-password`,
        { email: targetEmail, password: data.password, otp }
      );
      if(update.status === 200){
      dispatch(
        showToast({
          message: "You will be redirected to login page in 3 seconds",
          type: "success",
          heading: "Password Updated Successfully",
        })
      );
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
      }
} catch (error) {
  if(error.response.status === 400){
    dispatch(
      showToast({
        message: "OTP expired or invalid. Please try again.",
        type: "error",
        heading: "Update Failed",
      })
    );
}
  }finally {
    setLoading(false);
  }
  };
  return (
    <div>

        <div className="flex justify-center items-center h-screen ">
          <div className="flex flex-col gap-2 items-center relative justify-center p-4 py-7 bg-[#ffffff0c] rounded-2xl border border-[#ffffff15] w-[300px] md:w-[400px] 2xl:w-[500px] backdrop-blur-2xl ">
      
            <Link to={'/auth/login'} className="cursor-pointer text-[var(--general-white)] text-2xl absolute left-3 top-3">
              <i className="fi fi-rr-angle-small-left"></i>
            </Link>
            {loading && (
              <LoaderSpinner className={"absolute top-4 right-4"} size={30} />
            )}
            <LogoEmblem width={80} />

      {!verification ? (

            <div className="flex flex-col justify-center items-center gap-4 mt-3 w-full">

  <h1 className="text-white text-xl font-semibold">Reset Password</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <InputField
                className={""}
                type="email"
                placeholder={"ahmed@gmail.com"}
                label={"Email"}
                row={false}
                disabled={authenticated}
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}

              <div className="flex mt-3 justify-center gap-3 w-full">
                {!authenticated && (
                  <InputButtonFilled
                    text={"Next"}
                    type="submit"
                    disabled={loading}
                  />
                )}
              </div>
            </form>

            {authenticated && (
              <div className="flex justify-center flex-col items-center">
                <label className="text-[var(--primary-colour)] text-sm">
                  One-time passcode
                </label>
                <div className="flex gap-3 justify-center items-centerp-4 rounded-lg mt-3">
                  {[0, 1, 2, 3].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      disabled={loading}
                      inputMode="numeric"
                      maxLength={1}
                      ref={(el) => (inputs.current[i] = el)}
                      onChange={(e) => handleChange(e, i)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      className="w-10 h-10 text-center text-md rounded-md border bg-[var(--general-white)]/10 text-[var(--general-white)] border-[var(--general-white)]/15 focus:outline-none focus:ring-1 focus:ring-[var(--primary-colour)]"
                    />
                  ))}
                </div>

                <div className="flex mt-5 justify-center gap-3 w-full">
                    <InputButtonFilled
                    text={
                      disableResendOTP ? `Resend OTP (${timer}s)` : "Resend OTP"
                    }
                    type="button"
                    onClick={handleResend}
                    disabled={disableResendOTP}
                    className={"bg-white/10"}
                  />

                  <InputButtonFilled
                    text={"Verify"}
                    type="button"
                    onClick={handleOTP}
                    disabled={loading}
                  />
                
                </div>
              </div>
            )}

            </div>
          

  ) : (
        <div className="flex justify-center items-center w-full ">
         
         <form onSubmit={handleUpdatePassword(updatePassword)} className="flex items-center flex-col gap-3 w-full mt-4">
               <InputField
                type="password"
                placeholder={"••••••••••"}
                label={"New Password"}
                row={false}
                {...registerUpdatePassword("password", {
                  required: { value: true, message: "password is required" },
                  minLength: { value: 8, message: "Minimum length is 8 characters" },
                })}
                />
                 {updatePasswordErrors.password && ( 
                  <span className="text-red-500 text-xs">
                  {updatePasswordErrors.password.message}
                  </span>
                  )}
               <InputField
                type="password"
                placeholder={"••••••••••"}
                label={"Re-Enter Password"}
                row={false}
                {...registerUpdatePassword("confirmPassword", {
                  required: { value: true, message: "Confirm password is required" },
                  validate: (value) => value === password || "Password do not match",
                })}
                />
                 
                  {updatePasswordErrors.confirmPassword && (
                  <span className="text-red-500 text-xs">
                  {updatePasswordErrors.confirmPassword.message}
                  </span>
                  )}
                  <InputButtonFilled
                    text={"Update Password"}
                    type="submit"
                    className={"mt-2 w-max"}
                 

                  />

         </form>
    
        </div>
      )}




          </div>
        </div>
    
    </div>
  );
}

export default ForgetPassword;

// dispatch(
//             showToast({
//               message: "OTP Verified. You can now reset your password.",
//               type: "success",
//               heading: "OTP Verified",
//             })
//           );
