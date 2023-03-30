import mongoose from "mongoose";

const Notifications = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    },
    type: { type: String, required: true },
},
    { timestamps: true }
);

export default mongoose.model("Notifications", Notifications);