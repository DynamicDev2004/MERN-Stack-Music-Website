import { Router } from "express";
import { deleteSongFromUserLib } from "../controllers/deletefile.controller.js";
import { verifyJWT } from "../middlewares/verifyAuth.middleware.js";

const deleteRoutes = Router()

deleteRoutes.route('/userLib').post( verifyJWT ,deleteSongFromUserLib)

export default deleteRoutes