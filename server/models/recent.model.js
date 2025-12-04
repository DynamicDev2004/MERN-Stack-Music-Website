import {mongoose, Schema} from "mongoose";


const RecentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    songId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
    }
   

},{timestamps: true})

RecentSchema.index({ userId: 1, songId: 1 }, { unique: true });

const Recent = mongoose.model('recent',RecentSchema)
export default Recent