import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import e from "express";

import { sendEmail } from "../utils/sendMailer.js";

/* REGISTER USER */

export const register = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ msg: "An account with this email already exists." });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    const secret = speakeasy.generateSecret({ length: 20 });

    console.log("Generated 2FA Secret:", secret.base32);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      twoFactorSecret: secret.base32, // Save 2FA secret to user object
    });
    const savedUser = await newUser.save();

    let qrCodeUrl;
    if (savedUser.isTwoFactorEnabled) {
      qrCodeUrl = await QRCode.toDataURL(`otpauth://totp/YourAppName:${firstName}${lastName}?secret=${secret.base32}&issuer=Elkendy`);

      console.log("Generated QR Code URL:", qrCodeUrl);
    }

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const url = `http://localhost:3000/verify-account/${savedUser._id}/verify/${token}`;
    await sendEmail(email, "Verify your email", url); // sends verification link to user's email

    const responseData = {
      status: true,
      message: `Account created successfully! An email has been sent to your account, please verify.`,
      data: savedUser,
    };

    if (qrCodeUrl) {
      responseData.qrCodeUrl = qrCodeUrl;
    }

    res.status(201).json(responseData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* Verify2Fa Ahmed*/

export const verify2FA = async (req, res) => {
  try {
    const { email, password, token: twoFAToken } = req.body;
 
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "User does not exist." });
 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });
 
    //verify the 2fa token
    const verifiedtwofa = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token: twoFAToken,
      window: 2, // Allows for a 30-second
    });
 
    if (verifiedtwofa) {
      // Token is verified, issue a JWT
      const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
 
      await User.updateOne(
        { _id: user._id },
        { $set: { isTwoFactorEnabled: false } }
      );
 
      return res.status(200).json({
        token: jwtToken,
        user: { id: user._id, email: user.email, isTwoFactorEnabled: false },
      });
    } else {
      console.error(
        `Failed 2FA verification. User: ${email}, Token provided: ${twoFAToken}`
      );
      res.status(400).json({ message: "Invalid 2FA token." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password, token: twoFAToken } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    // Check if 2FA is enabled for the user
    if (user.isTwoFactorEnabled) {
      if (!twoFAToken) {
        return res.status(401).json({
          twoFactorRequired: true,
          message: "2FA token required.",
        });
      }

      const faverified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: "base32",
        token: twoFAToken,
        window: 2,
      });

      if (!faverified) {
        return res.status(400).json({ message: "Invalid 2FA token." });
      }
    }

    const token = jwt.sign(
      { id: user._id, fullName: user.firstName + " " + user.lastName },
      process.env.JWT_SECRET
    );

    if (!user || !isMatch)
      return res.status(400).json({ message: "Email or password not match !" });

    //if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );
    user.refreshToken = refreshToken;
    await user.save();

    const accessToken = jwt.sign(
      { id: user._id, fullName: user.firstName + " " + user.lastName },
      process.env.JWT_SECRET,
      { expiresIn: "2m" }
    );

    if (!user.verified) {
      const url = `http://localhost:3000/verify-account/${user._id}/verify/${accessToken}`;
      await sendEmail(email, "Verify your email", url); // sends verification link to user's email
      console.log("Email send Successfullyyyyyyyy !");
      return res.status(401).json({
        status: false,
        message: "An email sent to your account ! please verify !",
      });
    }

    delete user.password;
    res
      .status(200)
      .json({ accessToken, refreshToken: user.refreshToken, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token is required" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Check expiration date of refresh token
    const decodedRefreshToken = jwt.decode(refreshToken);
    if (
      decodedRefreshToken &&
      decodedRefreshToken.exp &&
      Date.now() >= decodedRefreshToken.exp * 1000
    ) {
      //console.log("Token expired!");
      return res.status(401).json({ message: "Refresh token has expired" });
    }

    const accessToken = jwt.sign(
      { id: user._id, fullName: user.firstName + " " + user.lastName },
      process.env.JWT_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not existed !" });
    }
    if (user.verified) {
      return res.status(400).json({
        status: false,
        message: "This account has already been verified!",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { verified: true }
    );
    if (!updatedUser) {
      res
        .status(400)
        .json({ status: "Failed", msg: "Failed To verify account" });
    }
    res
      .status(200)
      .json({ status: "Success", message: "The account has been verified" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const forgetPassord = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res
      .status(404)
      .json({ status: false, message: "User not existed !" });
  } else {
    console.log("email : ", email);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    const url = `http://localhost:3000/reset-password/${user._id}/${token}`;
    await sendEmail(email, "Reset your password", url);
    res.status(200).json({ status: "Success" });
  }
};

export const resetPassord = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const passwordHash = await bcrypt.hash(password, salt);

  const updatedUser = await User.findByIdAndUpdate(
    { _id: id },
    { password: passwordHash }
  );
  if (!updatedUser) {
    return res
      .status(400)
      .json({ status: "Failed", message: "Failed To Update Password" });
  }
  res.status(200).json({ status: "Success" });
};

/* Get All */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
