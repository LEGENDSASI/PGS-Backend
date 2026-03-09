import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { reviewModel } from "./models/reviewModel.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

app.get("/average-reviews", async (req,res)=>{
  const stats = await reviewModel.aggregate([
    {
      $group:{
        _id:"$teamMemberId",
        averageRating:{$avg:"$rating"},
        totalReviews:{$sum:1}
      }
    }
  ]);

  res.json(stats);
});

app.post("/add-review", async (req,res)=>{
  const {teamMemberId,rating}=req.body;

  const review = await reviewModel.create({
    teamMemberId,
    rating
  });

  res.json(review);
});

app.listen(4000,()=>console.log("Server running"));
