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
<<<<<<< HEAD
        }, 
        twoFactorSecret:{
            type:String,
            default: "",
        },
        isTwoFactorEnabled:{
            type:Boolean,
            default: false,
=======
        },
        verified: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String,
            default: ""
>>>>>>> 5d882dbe2a269be60624427c7385029a22973cc6
        }
    },
    { timestamps: true}
    );

    const User = mongoose.model("User",UserSchema);
    export default User;