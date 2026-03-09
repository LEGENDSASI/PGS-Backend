import mongoose from "mongoose";
let reviewSchema = new mongoose.Schema({
    teamMemberId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
});
const reviewModel = mongoose.model("Review", reviewSchema);
export  {reviewModel};