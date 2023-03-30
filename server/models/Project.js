import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
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
    img: {
        type: String,
        default: "",
        unique: false,
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
    works: {
        type: [String],
        default: []
    },
    tools: {
        type: [{
            _id: false,
            link: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            icon: {
                type: String,
                require: true,
            }
        }],
        default: [],
    },
    members: {
        type: [{
            _id: false,
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            role: {
                type: String,
                required: true,
            },
            access: {
                type: String,
                require: true,
                default: "View Only",
                unique: false,
            }
        }],
        required: true,
        default: [],
    },
},
    { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);