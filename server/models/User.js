import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        default: "",
    },
    img: {
        type: String,
        default: "",
    },
    googleSignIn:{
        type: Boolean,
        required: true,
        default: false,
    },
    projects: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Project",
        default: [],
    },
    teams: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Teams",
        default: [],
    },
    notifications: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Notifications",
        default: [],
    },
    works: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Works",
        default: [],
    },
    tasks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tasks",
        default: [],
    }
},
    { timestamps: true }
);

UserSchema.methods.generateVerificationToken = function () {
    const user = this;
    const verificationToken = jwt.sign(
        { ID: user._id },
        process.env.USER_VERIFICATION_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
    return verificationToken;
};

export default mongoose.model("User", UserSchema);