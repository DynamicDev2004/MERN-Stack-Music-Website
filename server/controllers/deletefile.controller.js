import Song from "../models/song.model.js";
import asyncHandler from "../utils/asyncHandler.middleware.js";
import ErrorApiResponse from "../utils/Error.ApiResponse.js";
import SuccessApiResponse from "../utils/Success.ApiResponse.js";
import fs from 'fs'

import { fileURLToPath } from 'url';
import path, { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




export const deleteSongFromUserLib = asyncHandler(async(req, res, next)=>{
const {data} = req.body
try {
   const deleteSongDB=  await Song.findByIdAndDelete(data);
if(!deleteSongDB) return res.status(403).json(new ErrorApiResponse(403, "No song or file exists"))
  fs.unlink(join(__dirname, `../${deleteSongDB.destination}`), (err)=>console.log(err))
res.status(200).json(new SuccessApiResponse(200,deleteSongDB,"success"))
} catch (error) {
 return res.status(501).json(new ErrorApiResponse(501, "Error Occurred while deleting the song from the user library", error))
}
next()
})