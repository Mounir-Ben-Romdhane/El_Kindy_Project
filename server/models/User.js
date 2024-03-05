import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max:50,
        }, 
        lastName: {
            type: String,
            required: true,
            min: 2,
            max:50,
        }, 
        email: {
            type: String,
            required: true,
            max:50,
            unique: true,
        }, 
        password: {
            type: String,
            required: true,
            min:5,
        },
        picturePath: {
            type: String,
            default: "",

        }, 
        twoFactorSecret:{
            type:String,
            default: "",
        },
        isTwoFactorEnabled:{
            type:Boolean,
            default: true,
        },
        verified: {
            type: Boolean,
            default: true
        },
        refreshToken: {
            type: String,
            default: ""
        }
    },
    { timestamps: true}
    );

    const User = mongoose.model("User",UserSchema);
    export default User;