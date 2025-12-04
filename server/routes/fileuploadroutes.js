import { globalDir, handleFile, updateSongInDB, updateSongInDBGlobal, userDir } from "../controllers/fileupload.controller.js";

import { verifyJWT } from "../middlewares/verifyAuth.middleware.js";
import Router from 'express';


const fileuploadrouter = Router()

fileuploadrouter.post(
  "/private",
  verifyJWT,
  userDir,
  handleFile,
  updateSongInDB

);
fileuploadrouter.post(
  "/global",
  verifyJWT,
  globalDir,
  handleFile,
  updateSongInDBGlobal

);


export default fileuploadrouter