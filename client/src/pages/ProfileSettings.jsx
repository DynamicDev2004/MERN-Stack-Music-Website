import React, { useEffect } from "react";
import {
  InputButtonFilled,
  InputButtonStroke,
  InputField,
  LinkButtonFilled,
} from "../components";
import { googleLogout } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThemeOptions, updateRoot } from "../controllers/theme.controller.js";
import { updateUser, logoutUser } from "../features/authSlice.js";
import { clearActiveSongData } from "../features/songSlice.js";
import { clearSongsData } from "../features/songsDataSlice.js";
import { showToast } from "../features/toastSlice.js";

function ProfileSettings() {
  const headingStyling =
    "text-[var(--general-white)] text-sm 2xl:text-md font-bold 2xl:text-lg";

  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues:{
      theme: theme
    }
  });

  const password = watch("password");
  let themeId = watch("theme");

  useEffect(() => {
    console.log("USER",user)
    if (themeId) {
      dispatch(updateRoot(themeId));
    }

  }, [themeId]);

  const logoutSession = (e) => {
    e.preventDefault();
    dispatch(logoutUser())
    dispatch(clearActiveSongData())
    dispatch(clearSongsData())
if(user.provider === 'google'){
  googleLogout()
}
  };
  const onSubmit = (data) => {
    dispatch(updateUser({ userId: user._id, ...data }));
    dispatch(showToast({
      type: 'success',
      heading: 'Profile Updated',
      message: 'Your profile has been updated successfully.'
    }))
  };
  return (
    <div className="p-5 overflow-scroll h-full no-scrollbar">
      <span className={headingStyling}>Profile Image</span>

      <div className={`flex items-center justify-between`}>
        <div className="flex items-center text-[var(--general-white)]/30 text-xs font-light py-3 hover:text-[var(--general-white)] rounded-lg cursor-pointer transition-all duration-200 ease-in-out gap-5">
          <span className="w-30 h-30 rounded-full block overflow-hidden">
            <img
              src={user?.provider=="google"? `${user?.userMetaData?.profile_Image}` : `${import.meta.env.VITE_BASE_URL}${user?.userMetaData?.profile_Image}` || ""}
              alt=""
              className="object-cover w-full h-full"
            />
          </span>
        
        </div>
      </div>
      <span className={`${headingStyling} my-3 block`}>Account Details</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label={"Name"}
          defaultValue={user && user.username}
          className={"w-full my-2"}
          row={true}
          {...register("username", {
            required: { value: true, message: "Name is required" },
          })}
        />
        {errors.username && (
          <span className="text-red-500 text-xs">
            {errors.username.message}
          </span>
        )}
        <InputField
          label={"Email"}
          disabled
          value={user && user.email}
          className={"w-full my-2"}
          row={true}
          {...register("email")}
        />
        <span className={`${headingStyling} my-3 block`}>Change Password</span>
        <InputField
          label={"New Password"}
          type={"password"}
          placeholder={"••••••••"}
          className={"w-full my-2"}
          row={true}
          {...register("password", {
            minLength: {
              value: 7,
              message: "Your password should be atleast 7 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}
        <InputField
          label={"Re-Enter New Password"}
          type={"password"}
          placeholder={"••••••••"}
          className={"w-full my-2"}
          row={true}
          {...register("repassword", {
            validate: (value) => value === password || "Password do not match",
          })}
        />
        {errors.repassword && (
          <span className="text-red-500 text-xs">
            {errors.repassword.message}
          </span>
        )}

        <div className="flex gap-3 items-center mt-5">
          <span className={`${headingStyling} my-5 block`}>Change Theme</span>

          {ThemeOptions.map((theme) => (
            console.log("MAP",theme.id),
            <span key={theme.id}>
              <input
                type="radio"
                name="theme"
                value={theme.id}
                id={theme.id}
                className="hidden"
                {...register("theme", { value: theme.id })}
                checked={theme.id == themeId}
               
              />
              <label
                htmlFor={theme.id}
                className={`w-6 h-6 rounded-full m-3 flex border-[var(--general-white)]/30 overflow-hidden items-center justify-center ${theme.id == themeId ? 'border-[3px] border-[var(--general-white)]/100 shadow-2xl' :  'border'}`}
              >
                <span className="-rotate-45">
                  <div
                    style={{ backgroundColor: `var(${theme.primary})` }}
                    className="w-14 h-7"
                  ></div>
                  <div
                    style={{ backgroundColor: `var(${theme.secondary})` }}
                    className="w-14 h-7"
                  ></div>
                </span>
              </label>
            </span>
             
          ))}
        </div>

        <div className="w-full flex justify-between">
   
          <LinkButtonFilled
            text={"logout"}
            type="button"
            className={
              "mt-5 mb-10 bg-red-500/30 border-red-500/50 hover:bg-red-500/60 hover:border-red-500/80"
            }
            onClick={(e) => logoutSession(e)}
          />
                 <InputButtonFilled
            text={"Save Changes"}
            type="submit"
            className={"mt-5 mb-10"}
          />
        </div>
      </form>
    </div>
  );
}

export default ProfileSettings;
