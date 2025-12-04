import asyncHandler from "../utils/asyncHandler.middleware.js";
import jwt from 'jsonwebtoken'
import ErrorApiResponse from "../utils/Error.ApiResponse.js";
import User from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next)=>{

  const fetchedAccessTokenCookie =  req.cookies?.accessToken 
  const fetchedRefreshTokenCookie =  req.cookies?.refreshToken 

if(!fetchedAccessTokenCookie && !fetchedRefreshTokenCookie) {
    return res.status(403).json(new ErrorApiResponse(403, "Access Denied :: Unauthorized User"));

}
   try {
    const decodedJWT =  jwt.verify(fetchedAccessTokenCookie, process.env.ACCESS_TOKEN_SECRET )
      if (decodedJWT) {
       const user = await User.findById(decodedJWT._id).select(
        "-password"
       )

       req.user = user
       next()
    }

   } catch (error) {
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json(new ErrorApiResponse(401, "Session Expired :: Please login again"));
    } else {
      return res.status(403).json(new ErrorApiResponse(403, "Invalid Token :: Unauthorized User"));
    }
   }
  





})
