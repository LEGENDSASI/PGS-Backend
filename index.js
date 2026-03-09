import express from "express";
import { reviewModel } from "./models/reviewModel.js";
import { connectDB } from "./cofig/db.js";
import cors from 'cors';

const port = 4000;
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

app.get("/average-reviews", async (req, res) => {
    try {
        const stats = await reviewModel.aggregate([
            {
                $group: {
                    _id: "$teamMemberId",
                    averageRating: { $avg: "$rating" },
                    totalReviews: { $count: {} }
                }
            }
        ]);

        const formattedStats = stats.reduce((acc, curr) => {
            acc[curr._id] = {
                averageRating: Number(curr.averageRating.toFixed(1)),
                totalReviews: curr.totalReviews
            };
            return acc;
        }, {});

        res.status(200).json(formattedStats);
    } catch (error) {
        console.error("Error fetching review stats:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/add-review", async (req, res) => {
    try {
        const { teamMemberId, rating } = req.body;
        console.log("Received data:", { teamMemberId, rating });

        if (!teamMemberId || !rating) {
            return res.status(400).json({ message: 'Missing required fields: teamMemberId, rating' });
        }

        const review = await reviewModel.create({
            teamMemberId: teamMemberId.toString(),
            rating: Number(rating),
        });

        console.log("Review created:", review);
        res.status(201).json({ message: 'Review added successfully!', data: review });
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(server is running on port ${port});
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();
