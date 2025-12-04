import {mkdir , readdir} from 'node:fs/promises'
import { join } from 'node:path'
import { upload } from "../middlewares/multer.middleware.js";
import { fileURLToPath } from 'url';
import path from 'path';
import asyncHandler from '../utils/asyncHandler.middleware.js';
import ErrorApiResponse from "../utils/Error.ApiResponse.js";

import SuccessApiResponse from "../utils/Success.ApiResponse.js";
import { parseFile } from 'music-metadata';
import Song from '../models/song.model.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const userDir =  asyncHandler(async (req, res, next)=>{    

   const id = req.user._id.toString()
   const dirpath = join(__dirname, `../users.uploads/BHpvt-${id}`)

  try {
     await mkdir(dirpath, {recursive: true})
    await readdir(dirpath) 
  } catch (error) {
          console.log(error)
  }
  req.targetDirectory = dirpath
next()
})


export const globalDir =  asyncHandler(async (req, res, next)=>{    

   const id = req.user._id.toString()
   const dirpath = join(__dirname, `../users.uploads/global`)

  try {
     await mkdir(dirpath, {recursive: true})
    await readdir(dirpath) 
  } catch (error) {
          console.log(error)
  }
  req.targetDirectory = dirpath
next()
})




export const handleFile = asyncHandler(async(req, res, next)=>{

    upload.single("file")(req, res, (err) => {
      if (err) {
        if (err.message === "File already exists") {
          return res.status(409).json(new ErrorApiResponse(409,err.message));
        }
        return res.status(400).json(new ErrorApiResponse(400,  err.message || "Upload failed"));
      }
      next();
    });
})

export const updateSongInDB = asyncHandler(  async(req, res) => {

  const id = req.user._id.toString()
  try {
    
    const filePath = `users.uploads/BHpvt-${id}/${req.file.originalname.replace(/\s+/g, "_")}`

    const metadata = await parseFile(filePath);
const originalName = req.file.originalname
const nameWithoutExt = path.parse(originalName).name

  const newSong = await Song.create({
      name: nameWithoutExt,
      userId: id,
      duration: metadata.format.duration,
      destination: filePath,
      size: req.file.size,
      album: metadata.common.album,
      artist: metadata.common.artist,
      visibility: "private"
    })
 
  } catch (error) {
    console.error('Error parsing metadata:', error.message);
    res.status(500).json(new ErrorApiResponse(500, "File was uploaded :: Internal DB error Occurred"))
  }
    res.status(200).json(new SuccessApiResponse(200, null, "file uploaded successfully"));
  }) 



  export const updateSongInDBGlobal = asyncHandler(  async(req, res) => {

    let category = [];

  try {
    category = JSON.parse(req.body.category); 
  } catch (err) {
    console.error("Category parse failed:", err);
  }


  const id = req.user._id.toString()
  try {
    
    const filePath = `users.uploads/global/${req.file.originalname.replace(/\s+/g, "_")}`

    const metadata = await parseFile(filePath);
const originalName = req.file.originalname
const nameWithoutExt = path.parse(originalName).name

  const newSong = await Song.create({
      name: nameWithoutExt,
      userId: id,
      duration: metadata.format.duration,
      destination: filePath,
      size: req.file.size,
      album: metadata.common.album,
      artist: metadata.common.artist,
      visibility: "global",
      category: category,
      trending: req.body.trending,
    })
 
  } catch (error) {
    console.error('Error parsing metadata:', error.message);
    res.status(500).json(new ErrorApiResponse(500, "File was uploaded :: Internal DB error Occurred"))
  }
    res.status(200).json(new SuccessApiResponse(200, null, "file uploaded successfully"));
  }) 
