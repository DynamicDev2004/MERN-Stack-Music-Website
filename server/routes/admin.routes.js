import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyAuth.middleware.js";
import { adminUpdateFeaturedSong, adminUpdateTrendingSong } from "../controllers/admin.controller.js";

const adminRoutes = Router()

adminRoutes.route('/updateTrending').post(verifyJWT, adminUpdateTrendingSong)
adminRoutes.route('/updateFeatured').post(verifyJWT, adminUpdateFeaturedSong)

export default adminRoutes;