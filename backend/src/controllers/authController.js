import bcrypt from "bcryptjs";
import User from "../models/user.js";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";

// Register new user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      isMfaActive: false,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user", message: error.message });
  }
};

// Login (handled by passport middleware)
export const login = async (req, res) => {
  res.status(200).json({
    message: "User logged in successfully",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
};

// Auth Status
export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User is authenticated",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({ message: "Unauthorized User" });
  }
};

// Logout
export const logout = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized User" });
  }

  req.logout(err => {
    if (err) return res.status(400).json({ message: "Logout failed", error: err.message });
    res.status(200).json({ message: "Logout successful" });
  });
};

// 2FA Setup
export const setup2FA = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const secret = speakeasy.generateSecret({
      name: `MyApp (${user.username})`,
      issuer: "KarthickVasan.com",
    });

    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();

    const qrCodeDataURL = await qrCode.toDataURL(secret.otpauth_url);

    res.status(200).json({
      message: "2FA setup successful",
      secret: secret.base32,
      otpauth_url: secret.otpauth_url,
      qrCode: qrCodeDataURL,
    });
  } catch (error) {
    console.error("2FA setup error:", error);
    res.status(500).json({
      error: "Error setting up 2FA",
      message: error.message,
    });
  }
};

// 2FA Verify
export const verify2FA = async (req, res) => {
  try {
    const { token } = req.body;
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (!user.twoFactorSecret) {
      return res.status(400).json({ message: "2FA not set up for this user" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1, // allows 30s before/after
    });

    if (!verified) {
      return res.status(400).json({ message: "Invalid 2FA Token" });
    }

    const jwtToken = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "2FA verification successful",
      token: jwtToken,
    });
  } catch (error) {
    console.error("2FA verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 2FA Reset
export const Reset2FA = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    user.twoFactorSecret = "";
    user.isMfaActive = false;
    await user.save();

    res.status(200).json({ message: "2FA reset successful" });
  } catch (error) {
    res.status(500).json({
      error: "Error resetting 2FA",
      message: error.message,
    });
  }
};  