import Song from "../models/song.model.js";
import asyncHandler from "../utils/asyncHandler.middleware.js";
import ErrorApiResponse from "../utils/Error.ApiResponse.js";
import SuccessApiResponse from "../utils/Success.ApiResponse.js";

export const adminUpdateTrendingSong = asyncHandler(async(req, res)=>{
const trending = req.body.trending;
const songId = req.body.songId;

try {
    const song = await Song.findOneAndUpdate({_id : songId},{trending : trending})
    res.status(200).json(new SuccessApiResponse(200, song, "success"))
} catch (error) {
     res.status(500).json(new ErrorApiResponse(500, "something went wrong", error))
}


})
export const adminUpdateFeaturedSong = asyncHandler(async(req, res)=>{
const featured = req.body.featured;
const songId = req.body.songId;

try {
    const song = await Song.findOneAndUpdate({_id : songId},{featured : featured})
       res.status(200).json(new SuccessApiResponse(200, song, "success"))
} catch (error) {
     res.status(500).json(new ErrorApiResponse(500, "something went wrong", error))
}


})