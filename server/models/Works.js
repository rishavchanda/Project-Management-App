import mongoose from "mongoose";

const WorksSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projects",
        required: true,
        unique: false,
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: false,
    },
    title: {
        type: String,
        required: true,
        unique: false,
    },
    desc: {
        type: String,
        required: true,
        unique: false,
    },
    priority: {
        type: String,
        required: true,
        default: "Low",
    },
    tags: {
        type: [String],
        default: [],
    },
    status: {
        type: String,
        required: true,
        default: "Working",
    },
    tasks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tasks",
        default: [],
    }
},
    { timestamps: true }
);

export default mongoose.model("Works", WorksSchema);