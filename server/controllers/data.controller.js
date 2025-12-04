import asyncHandler from "../utils/asyncHandler.middleware.js";
import { fileURLToPath } from "url";
import SuccessApiResponse from "../utils/Success.ApiResponse.js";
import ErrorApiResponse from "../utils/Error.ApiResponse.js";
import Song from "../models/song.model.js";
import Recent from "../models/recent.model.js";
import Favourite from "../models/favourite.model.js";

const __filename = fileURLToPath(import.meta.url);

export const getUserSongs = asyncHandler(async (req, res) => {
  const id = req.user._id.toString();

  try {
    const getUserLib = await Song.find({ userId: id, visibility: "private" });
    res.status(200).json(new SuccessApiResponse(200, getUserLib, "successful"));
    console.log(getUserLib)
  } catch (error) {
    res
      .status(403)
      .json(new ErrorApiResponse(403, "User directory not exists"));
  }
});
export const getGlobalSongs = asyncHandler(async (req, res) => {
  const id = req.user._id.toString();

  try {
    const getGlobalLib = await Song.find({visibility: "global" });
    res.status(200).json(new SuccessApiResponse(200, getGlobalLib, "successful"));
    console.log(getGlobalLib)
  } catch (error) {
    res
      .status(403)
      .json(new ErrorApiResponse(403, "User directory not exists"));
  }
});

export const recentHistory = asyncHandler(async(req, res)=>{
  const {_id, userId} = req.body


try {
  const addRecentHistory = await Recent.findOneAndUpdate(
        { userId, songId: _id },        
        { $set: { userId, songId: _id } }, 
        { new: true, upsert: true }  
      )
      res.status(200).json(new SuccessApiResponse(200, addRecentHistory, "success"))
    console.log(addRecentHistory)
    }
     catch (error) {
  res.status(500).json(new ErrorApiResponse(500, error))
}


})

export const getHistory = asyncHandler(async(req, res)=>{

  try {
    const history = await Recent.find({userId: req.user._id}).sort({updatedAt: -1}).limit(20).populate("songId").select('songId -_id')

    const songs = history.map(r => r.songId);
    if(songs){
      res.status(200).json(new SuccessApiResponse(200, songs, 'success'))
    }
  } catch (error) {
    res.status(500).json(new ErrorApiResponse(500, 'Failed to fetch data from database'))
    console.log(error)
  }
})

export const searchResults = asyncHandler(async(req, res)=>{
const searchQuery = req.body.search
try {
  const results =await Song.find({
    visibility: 'global',
    $or: [
      { name: { $regex: searchQuery, $options: "i" } },
      { category: { $regex: searchQuery, $options: "i" } },
    ]
  })
  res.status(200).json(new SuccessApiResponse(200, results, "success"))
} catch (error) {
  res.status(500).json(new ErrorApiResponse(500, `something went wrong while searching :: ${error}`))
}
})

export const getTrending = asyncHandler(async(req, res)=>{
 try {
  const trendingSongs = await Song.find({visibility: 'global',trending: true})
res.status(200).json(new SuccessApiResponse(200, trendingSongs, "success"))
 } catch (error) {
  res.status(500).json(new ErrorApiResponse(500, `something went wrong while searching :: ${error}`))
 }

})
export const getFeatured = asyncHandler(async(req, res)=>{
 try {
  const featuredSongs = await Song.find({visibility: 'global',featured: true})
res.status(200).json(new SuccessApiResponse(200, featuredSongs, "success"))
 } catch (error) {
  res.status(500).json(new ErrorApiResponse(500, `something went wrong while searching :: ${error}`))
 }

})


export const getFavourite = asyncHandler(async (req, res) => {
  const id = req.user._id.toString();

  try {
    const getFavourite = await Favourite.find({userId: id}).populate("songId");
    res.status(200).json(new SuccessApiResponse(200, getFavourite, "successful"));
    console.log(getFavourite)
  } catch (error) {
    res
      .status(403)
      .json(new ErrorApiResponse(403, "User directory not exists"));
  }
});

export const getKeywordResults = asyncHandler(async (req, res)=>{
  const keyword = req.params.keyword
try {
  const results = await Song.find({
    category: { $regex: new RegExp(`^${keyword}$`, 'i') }
  });
  return res.status(200).json(new SuccessApiResponse(200, results, 'success'))
} catch (error) {
    res.status(500).json(new SuccessApiResponse(500, 'failed to fetch the details', error))
}

})


