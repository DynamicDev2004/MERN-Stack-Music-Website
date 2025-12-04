import Router from 'express';
import { verifyJWT } from '../middlewares/verifyAuth.middleware.js';
import { getUserSongs, recentHistory, getHistory, getGlobalSongs, searchResults, getTrending, getFeatured, getFavourite, getKeywordResults } from '../controllers/data.controller.js';

const dataRoutes = Router()

dataRoutes.route('/getUserSongs').get(verifyJWT, getUserSongs)
dataRoutes.route('/getGlobalSongs').get(verifyJWT, getGlobalSongs)
dataRoutes.route('/getHistory').get(verifyJWT, getHistory)
dataRoutes.route('/getFavourite').get(verifyJWT, getFavourite)
dataRoutes.route('/recent').post(verifyJWT, recentHistory)
dataRoutes.route('/search').post(verifyJWT, searchResults)
dataRoutes.route('/getTrending').get(verifyJWT, getTrending)
dataRoutes.route('/getFeatured').get(verifyJWT, getFeatured)
dataRoutes.route('/getKeywordResults/:keyword').get(verifyJWT, getKeywordResults)

export default dataRoutes;