import axios from "axios";
import Recent from "../models/recent.model.js";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.middleware.js";
import ErrorApiResponse from "../utils/Error.ApiResponse.js";
import { OAuthGoogle } from "../utils/googleAuth.js";
import SuccessApiResponse from "../utils/Success.ApiResponse.js";
import bcrypt from 'bcrypt'
import mailTransporator from "../utils/gmailUtils.js";
import jwt from 'jsonwebtoken'

const accessTokenOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 1 * 24 * 60 * 60 * 1000, 
}
const refreshTokenOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 10 * 24 * 60 * 60 * 1000, 
}
 
async function generateAccessRefreshToken(user_id) {

try {
  const user = await User.findById(user_id)
  if(!user) throw new ErrorApiResponse(402, "User not found and Tokens are not set :: Error Generating Tokens")
  
      const accessToken =  user.genAccessToken()
    const refreshToken = user.genRefreshToken()
  
    user.refreshToken = refreshToken
    user.save({validateBeforeSave: false})
  return {accessToken, refreshToken}
} catch (error) {

  throw new ErrorApiResponse(500, "Something went wrong while generating the Token :: ERROR GENERATING TOKEN FUNCTION ERROR :: EXIT CATCH")
}
}

const register = asyncHandler( async (req, res)=>{

const {username, email, password, theme} = req.body

if([username, email, password].some((elem)=> elem?.trim() === "")){

  return res.status(400).json(new ErrorApiResponse(400, "All fields are required"))  
}

try {
  const sendData = await User.create({
      username: username,
      password: password,
      email: email,
      userMetaData:{
        theme: theme || 2,
        profile_Image: "/users.uploads/default-image.png"
      }
  })
  res.status(200).json(new SuccessApiResponse(200, sendData, "User has been registered successfully"))
} catch (error) {

  if(error?.code === 11000){
    return res.status(400).json(new ErrorApiResponse(400, "Email already exists"))
  }
  return res.status(500).json(new ErrorApiResponse(500, "Internal Server Error"))
}


})

const login = asyncHandler( async (req, res)=>{

try {
  const {email, password} = req.body
  
  if([email, password].some((elem)=> elem?.trim() === "")){
  
    return res.status(400).json(new ErrorApiResponse(400, "All fields are required"))  
  }
  
  const user = await User.findOne({email: email})

  if(user === null){
    return res.status(404).json(new ErrorApiResponse(404,"No User Found"))
  }

  if(user.provider !== "local"){
    return res.status(405).json(new ErrorApiResponse(405, `Please login using ${user.provider} authentication method`))
  }
  
  if(user){
  const checkPassword = await user.checkPassword(password)
  console.log(checkPassword)
  if(checkPassword){
  
  const {accessToken , refreshToken } = await generateAccessRefreshToken(user._id)
  console.log({accessToken,refreshToken, ...user._doc})

  return res
  .status(200)
  .cookie("accessToken",accessToken,accessTokenOptions)
  .cookie("refreshToken",refreshToken,refreshTokenOptions)
  .json(new SuccessApiResponse(200, {accessToken,refreshToken, ...user._doc} ,"user id logged in and tokens has been sent" ))
  }
  else{
     return res.status(406).json(new ErrorApiResponse(406,"Wrong Password"))
  }
  
} 
}catch (error) {

  return res.send(500).json(new ErrorApiResponse(500, error))
}

})


const googleLogin = asyncHandler( async (req, res)=>{
      const {code} = req.query
  try {
    
    const googleToken = await OAuthGoogle.getToken(code)
    OAuthGoogle.setCredentials(googleToken.tokens)
   const  userDetails = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${googleToken.tokens.access_token}`)

   const checkUser = await User.findOne({email: userDetails.data.email})
    if(!checkUser){
    const createUser = await User.create({
        username: userDetails.data.name,
        provider:'google',
        email: userDetails.data.email,
        userMetaData: {
        profile_Image: userDetails.data.picture,
        theme: 1
      }
      })
     const {accessToken , refreshToken } = await generateAccessRefreshToken(createUser._id)

  return res
  .status(200)
  .cookie("accessToken",accessToken,accessTokenOptions)
  .cookie("refreshToken",refreshToken,refreshTokenOptions)
  .json(new SuccessApiResponse(200, {accessToken,refreshToken, ...createUser._doc} ,"user id logged in and tokens has been sent" ))
  
  } 

   const {accessToken , refreshToken } = await generateAccessRefreshToken(checkUser._id)


  return res
  .status(200)
  .cookie("accessToken",accessToken,accessTokenOptions)
  .cookie("refreshToken",refreshToken,refreshTokenOptions)
  .json(new SuccessApiResponse(200, {accessToken,refreshToken, ...checkUser._doc} ,"user id logged in and tokens has been sent" ))

  
    
  } catch (error) {
    console.log(error)
  }



// try {
  
//   if([email, password].some((elem)=> elem?.trim() === "")){
  
//     return res.status(400).json(new ErrorApiResponse(400, "All fields are required"))  
//   }
  
//   const user = await User.findOne({email: email})
  
//   if(!user){
//     return res.status(401).json(new ErrorApiResponse(401,"No User Found"))
//   }
  
//   if(user){
//   const checkPassword = await user.checkPassword(password)
//   console.log(checkPassword)
//   if(checkPassword){
  
//   const {accessToken , refreshToken } = await generateAccessRefreshToken(user._id)
//   console.log({accessToken,refreshToken, ...user._doc})

//   return res
//   .status(200)
//   .cookie("accessToken",accessToken,options)
//   .cookie("refreshToken",refreshToken,options)
//   .json(new SuccessApiResponse(200, {accessToken,refreshToken, ...user._doc} ,"user id logged in and tokens has been sent" ))
//   }
//   else{
//      return res.status(401).json(new ErrorApiResponse(401,"Wrong Password"))
//   }
  
// } 
// }catch (error) {
//   return res.send(500).json(new ErrorApiResponse(500, error))
// }




})


const updateUser = asyncHandler( async (req, res)=>{
  const {username, email, password, theme, userId} = req.body

  console.log({username, email, password, theme, userId})

if(password != ''){
const  hashedpassword  = await bcrypt.hash(password,10)
const updatePsasword = await User.updateOne({_id: userId},{$set:{password: hashedpassword}})
}

try {
  const updateData = await User.updateOne({_id: userId},{

    $set: {
      username: username,
      "userMetaData.theme": theme
    },
    }
  )
  console.log("UPDATEDATA",updateData)
  res.status(200).json(new SuccessApiResponse(200, updateData, "User has been updated successfully"))
} catch (error) {

  if(error?.code === 11000){
    return res.status(400).json(new ErrorApiResponse(400, "Email already exists"))
  }
  return res.status(500).json(new ErrorApiResponse(500, "Internal Server Error"))
}


})

const forgetPassword = asyncHandler( async (req, res)=>{
const email = req.query.email
  let otp = ''
for (let index = 0; index <= 3; index++) {
  otp = otp + (Math.floor(Math.random()*9))

}

  const mailOptions = {
  from: "ahmed.hasnain43343@gmail.com",
  to: email,
  subject: "One-Time Authentication Token",
  text: `Your OTP is ${otp}. It is valid for 1 minute. Do not share it with anyone.`,
}
  mailTransporator.sendMail(mailOptions, (err, info)=>{
    if(err)console.log(err)
    
  })

if(!email) return res.send(500).json(new ErrorApiResponse(500, "Bad Request :: Query Email not received"))

  try {
   const user = await User.findOne({email})
   if(!user) return res.status(404).json(new ErrorApiResponse(404, "No User Found with this email"))
   if(user.provider !== "local"){
    return res.status(400).json(new ErrorApiResponse(400, "Cannot reset password for Google Authenticated Users"))
   }
   
     await User.findOneAndUpdate({email},{otp, otpExpiresAt: Date.now() + 1*60*1000})
    
      res.status(200).json(new SuccessApiResponse(200, email, 'success'))
  } catch (error) {
    console.log("ERROR while finding user for forget password",error)
  }
})

const verifyOTP = asyncHandler(async (req, res)=>{

const {email, otp} = req.body

const user = await User.findOne({email, otp})

if(!user) return res.status(400).json(new ErrorApiResponse(400, "Invalid OTP or Email"))
 
  if (user.otpExpiresAt < new Date()){

  return res.status(400).json(new ErrorApiResponse(400, "OTP Expired"))
}
  res.status(200).json(new SuccessApiResponse(200, null, "OTP Verified Successfully"))
})
const updatePassword = asyncHandler(async (req, res)=>{

  const {email, password, otp} = req.body

try {
  const checkvalidity = await User.findOne({email, otp}, {otpExpiresAt:1})

  if(checkvalidity && checkvalidity.otpExpiresAt < new Date()){
return res.status(400).json(new ErrorApiResponse(400, "OTP Expired"))
}
if(password != ''){
const  hashedpassword  = await bcrypt.hash(password,10)
try {
  const updatePassword = await User.updateOne({email, otp},{$set:{password: hashedpassword, otp: null, otpExpiresAt: null}})
  res.status(200).json(new SuccessApiResponse(200, updatePassword, "Password has been updated successfully"))
} catch (error) {
  console.log("ERROR while updating password", error)
  return res.status(500).json(new ErrorApiResponse(500, "Internal Server Error"))
}

}

} catch (error) {
  return res.status(500).json(new ErrorApiResponse(500, "Internal Server Error"))
}






})

const logout = asyncHandler(async (req, res)=>{

await User.findByIdAndUpdate(
  req.user._id,
  {
    $set:{refreshToken: null}
  },
  {
    new: true
  }
)
res.status(200).clearCookie('accessToken', accessTokenOptions).clearCookie('refreshToken', refreshTokenOptions).json(new SuccessApiResponse(200, null, "User has been logged out"))
})

const getUser = asyncHandler(async (req, res)=>{


res.status(200).json(new SuccessApiResponse(200,req.user))
})

const refreshUserToken = asyncHandler(async (req, res)=>{

   const incomingRefreshToken = req.cookies?.refreshToken

   if(!incomingRefreshToken){
     return new ErrorApiResponse(401, 'Invalid Token :: Session Expired')
    }

try {
      const verifyRefreshJWT = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

      const findUser = await User.findOne({_id: verifyRefreshJWT?._id}).select('-password')

      if(incomingRefreshToken == findUser.refreshToken){
     
       const {refreshToken , accessToken} = await generateAccessRefreshToken(verifyRefreshJWT?._id)

         return res.status(200)
  .cookie("accessToken",accessToken,accessTokenOptions)
  .cookie("refreshToken",refreshToken,refreshTokenOptions)
  .json(new SuccessApiResponse(200, {accessToken,refreshToken, ...findUser._doc} ,"user id logged in and tokens has been sent" ))

      }

} catch (error) {
  res.status(401).json(new ErrorApiResponse(401, "Invalid Token :: Session Expired"))
 if(error.name === 'TokenExpiredError'){
    return new ErrorApiResponse(400, 'Invalid Token :: Session Expired')
 }
}
})
export {register, login, logout, getUser, updateUser, googleLogin, forgetPassword, verifyOTP, updatePassword, refreshUserToken}