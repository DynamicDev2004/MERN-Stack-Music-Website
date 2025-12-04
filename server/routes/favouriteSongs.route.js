
import  Router  from "express";
import { handleFavouriteSongs } from "../controllers/favourite.controller.js";
import { verifyJWT } from "../middlewares/verifyAuth.middleware.js";


const favouriteRouter = Router()

favouriteRouter.route('/favourite').post(verifyJWT, handleFavouriteSongs)

export default favouriteRouter