import { mongoose, Schema } from "mongoose";

const FavouriteSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  },
  { timestamps: true }
);

FavouriteSchema.index({ userId: 1, songId: 1 }, { unique: true });

FavouriteSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const filter = this.getFilter(); 

    if (filter.userId && filter.songId) {
      await mongoose
        .model("Song")
        .findOneAndUpdate(
          { userId: filter.userId, _id: filter.songId },
          [
            { $set: { isFavourite: { $not: "$isFavourite" } } }
          ],
          { new: true }
        );
    }
  } catch (error) {
    console.log(error);
  }

  next();
});


const Favourite = mongoose.model("favourite", FavouriteSchema);
export default Favourite;
