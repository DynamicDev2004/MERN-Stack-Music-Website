import Router from 'express';
import { register, login, logout, getUser, updateUser, googleLogin, forgetPassword, verifyOTP, updatePassword, refreshUserToken} from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/verifyAuth.middleware.js';

const router = Router()



router.route('/register').post(register)
router.route('/login').post(login)
router.route('/forget-password').get(forgetPassword)
router.route('/forget-password').post(verifyOTP)
router.route('/reset-password').post(updatePassword)
router.route('/googleLogin').get(googleLogin)
router.route('/updateUser').post(updateUser)
router.route('/logout').post(verifyJWT, logout)
router.route('/getuser').post(verifyJWT, getUser)
router.route('/refreshToken').post(refreshUserToken)

export default router; 