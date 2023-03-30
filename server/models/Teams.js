import mongoose, { Mongoose } from "mongoose";

const TeamSchema = new mongoose.Schema({
    name: {
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
    projects: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "Project",
        unique: true
    }
},
    { timestamps: true }
);

export default mongoose.model("Teams", TeamSchema);