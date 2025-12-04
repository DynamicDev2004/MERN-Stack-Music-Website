// require('dotenv').config();
import mongoose from 'mongoose';
import ErrorApiResponse from '../utils/Error.ApiResponse.js';


 export default (async ()=>{

try {
  const connection = await mongoose.connect("mongodb://127.0.0.1:27017/beatHive")
 return connection

} catch (error) {
     throw new ErrorApiResponse(500, "Database connection failed:", error);
}


 })()