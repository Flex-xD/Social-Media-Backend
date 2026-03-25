import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true , 
        minLength:6
    },
    profilePicture: {
        url: { type: String },
        publicId: {
            type: String,
        },
        width: { type: Number },
        height: { type: Number },
        format: { type: String },
    },
    bio: {
        type: String ,
        default:""
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: []
    }]
} , {
    timestamps:true
});

// ? see if pre hashing is working or else remove it
userSchema.pre("save" , async (next) => {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt); 
    next();
})

const User = mongoose.model('User' , userSchema);
export default User;