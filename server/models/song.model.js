import {mongoose, Schema} from "mongoose";


const SongSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    duration:{
        type: Number,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    size: {
        type: String, 
        required: false
    },
    album:{
         type: String, 
        default: "unknown"
    },
    artist:{
         type: String, 
        default: "unknown"
    },
    visibility:{
         type: String, 
        default: "unknown"
    },
    isFavourite:{
         type: Boolean, 
        default: false
    },
    category:{
         type: Object, 
        default: []
    },
    trending:{
         type: Boolean, 
        default: false
    },
    featured:{
         type: Boolean, 
        default: false
    },

})

SongSchema.pre('findOneAndDelete',async function(next){
const song = await this.model.findOne(this.getFilter())
if(song){
  await  mongoose.model('recent').deleteMany({songId: song._id})
}
next()
})

const Song = mongoose.model('Song',SongSchema)
export default Song