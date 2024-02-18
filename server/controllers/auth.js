import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import e from "express";

/* REGISTER USER */
/* export const register = async (req, res) => {
    try {

        console.log('Request Body:', req.body);

        const {
            firstName,
            lastName,
            email,
            password,
            picturePath
        } = req.body;

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath
        });
        const savedUser = await newUser.save();
        res.status(201).json({savedUser});
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
};
 */

/* REGISTER USER Ahmed*/

export const register = async (req,res) => {
    try{
        console.log("request body :",req.body);


        const {firstName,lastName,email,password,picturePath} = req.body;   

        // Check if the user already exists
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({msg:"An account with this email already exists."});
        }
    

    // Hash the password
         const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create new user with hashed password
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath
        });

        // Generate a 2FA secret for the user
        const secret = speakeasy.generateSecret({ length: 20 });
        newUser.twoFactorSecret = secret.base32;

        // Save the user to the database
        const savedUser = await newUser.save();

        // Generate a QR code URL for the user to scan with a 2FA app
        const qrCodeUrl = await QRCode.toDataURL(speakeasy.otpauthURL({
            secret: secret.ascii,
            label: encodeURIComponent(`YourAppName:Elkendy`), 
            issuer: 'Elkendy' 
        }));

        
// Update the user's profile to reflect that 2FA is enabled
await User.findByIdAndUpdate(savedUser._id, { isTwoFactorEnabled: true });

        res.status(201).json({ user: savedUser, qrCodeUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }

    }

/* LOGGING IN Ahmed*/

export const login = async (req, res) => {
    try {
        const { email, password, token: twoFAToken } = req.body; // Expect a 2FA token if 2FA is enabled
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ message: "User does not exist." });

        const isLoggedIn = await bcrypt.compare(password, user.password);
        if (!isLoggedIn) return res.status(400).json({ message: "Invalid credentials." });

        if (user.isTwoFactorEnabled) {
            if (!twoFAToken) {
                // If 2FA is enabled but no token is provided, prompt for it
                return res.status(401).json({
                    twoFactorRequired: true,
                    message: "2FA token required."
                });
            }

            // Verify the 2FA token
            const verified = speakeasy.totp.verify({
                secret: user.twoFactorSecret,
                encoding: 'base32',
                token: twoFAToken
            });

            if (!verified) {
                return res.status(400).json({ message: "Invalid 2FA token." });
            }
        }

        // Generate JWT token after successful login and 2FA verification
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

export const verify2FA = async (req, res) => {
    try{
        const{userId, token} = req.body;
        const user= await User.findById(userId);

        if(!user) return res.status(400).json({ message: "User does not exist." });

        //verify the 2fa token
        const verified= speakeasy.totp.verify({
            secret:user.twoFactorSecret,
            encoding: 'base32',
            token:token
        })
        if (verified) {
            // Token is verified, issue a JWT
            const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h', 
            });
            res.status(200).json({ token: jwtToken, user: { id: user._id, email: user.email } });
        } else {
            res.status(400).json({ message: "Invalid 2FA token." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }







/* LOGGING IN */
/*  export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if(!user) return res.status(400).json({ msg: "User does not exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });


        const token = jwt.sign({ id: user._id, fullName: user.firstName + " " + user.lastName }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
}  */




/* Get All */
 export const getAllUsers = async (req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json({users});
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
 
}