import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    minlength: 8,
    required: function(){
      return this.provider === "local"
    },
  },
  provider: {
    type: String,
    default: "local"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'is invalid'],
    index: true,
  },
  userMetaData: {
    type: Object,
    default: {},
  },
  refreshToken:{
    type: String,
    default: null

  },
  otp:{
    type: String,
    default: null

  },
   otpExpiresAt: { type: Date, default: null },
}, {timestamps: true});

userSchema.pre("save", async function (next) {
   if(!this.isModified("password")) return next();
 this.password  = await bcrypt.hash(this.password,10)
next();
})



userSchema.methods.checkPassword = async function (password) {

 return await bcrypt.compare(password, this.password)

}

userSchema.methods.genAccessToken = function () {
return  jwt.sign(
    {
      _id  : this._id,
      user: this.username,
      metaData: this.userMetaData
    },process.env.ACCESS_TOKEN_SECRET ,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRE}
  )
}
userSchema.methods.genRefreshToken = function () {
return  jwt.sign(
    {
      _id  : this._id
    },process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRE}
  )
}
const User = mongoose.model("User", userSchema);

export default User;
