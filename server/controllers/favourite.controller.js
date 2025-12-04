import Favourite from "../models/favourite.model.js";
import Song from "../models/song.model.js";
import asyncHandler from "../utils/asyncHandler.middleware.js";
import ErrorApiResponse from "../utils/Error.ApiResponse.js";
import SuccessApiResponse from "../utils/Success.ApiResponse.js";

export const handleFavouriteSongs = asyncHandler(async (req, res, next) => {

  const userId = req.user._id;
  const songId = req.body._id;

  try {
    const checkFavourite = await Favourite.findOneAndUpdate({userId, songId})

    if (checkFavourite) {

      const deleted = await Favourite.deleteOne({ songId, userId });
      return res.status(200).json(
        new SuccessApiResponse(200, deleted, {title:"Removed", body: "Song has been removed from favourite list"})
      );
    }

    const created = await Favourite.create({ songId, userId });
    return res.status(200).json(
      new SuccessApiResponse(200, created, {title:"Added", body: "Song has been added to favourite list"})
    );
  } catch (error) {

    if (error.code === 11000) {
      return res.status(200).json(
        new SuccessApiResponse(200, null, "Song is already in favourite list")
      );
    }

    return res.status(500).json(
      new ErrorApiResponse(500, "Failed to update favourite list", error.message)
    );
  }
  finally{
    next()
  }
});
