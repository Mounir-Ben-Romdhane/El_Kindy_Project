import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendEmail } from '../utils/sendMailer.js';

/* REGISTER USER */
export const register = async (req, res) => {
    try {

        console.log('Request Body:', req.body);

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const url = `http://localhost:3000/verify-account/${savedUser._id}/verify/${token}`;
        await sendEmail(email, "Verify your email", url); // sends verification link to user's email
        // console.log("Email send Successfully !");
        res.status(201).json({ status: true, message: `Account created successfully !An email sent to your account please verify !`, data: savedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, user.password);

        if (!user || !isMatch) return res.status(400).json({ message: "Email or password not match !" });


        //if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id, fullName: user.firstName + " " + user.lastName }, process.env.JWT_SECRET, { expiresIn: "30m" });
        if (!user.verified) {
            const url = `http://localhost:3000/verify-account/${user._id}/verify/${token}`;
            await sendEmail(email, "Verify your email", url); // sends verification link to user's email
            console.log("Email send Successfullyyyyyyyy !");
            return res.status(401).json({ status: false, message: "An email sent to your account ! please verify !" });
        }
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const verifyAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not existed !" });
        }
        if (user.verified) {
            return res.status(400).json({ status: false, message: "This account has already been verified!" })
        }
        const updatedUser = await User.findByIdAndUpdate({ _id: id }, { verified: true });
        if (!updatedUser) {
            res.status(400).json({ status: "Failed", msg: "Failed To verify account" })
        }
        res.status(200).json({ status: "Success", message: "The account has been verified" })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const forgetPassord = async (req, res) => {
    const {
        email
    } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).json({ status: false, message: "User not existed !" });
    }
    else {
        console.log("email : ", email)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "5m" });

        const url = `http://localhost:3000/reset-password/${user._id}/${token}`;
        await sendEmail(email, "Reset your password", url);
        res.status(200).json({ status: "Success" })
    }
}

export const resetPassord = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate({ _id: id }, { password: passwordHash });
    if (!updatedUser) {
        return res.status(400).json({ status: "Failed", message: "Failed To Update Password" })
    }
    res.status(200).json({ status: "Success" })

}



/* Get All */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}
/*
export const loginWithGoogle = asyncHandler(async (req, res) => {

    const { usertoken } = req.body;
    console.log('usertoken:', usertoken);
    res.status("Google login");
});*/
