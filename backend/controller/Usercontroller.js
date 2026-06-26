const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../model/Usermodel');
const bcrypt = require('bcryptjs');
const Otp = require('../model/Otpmodel');
const transporter = require('../Utils/Sendmails');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);

    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;


        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        const otp = new Otp({
            email,
            otp: otpCode,
        });
        await otp.save();

        try {
            await transporter.sendMail({
                from: process.env.GOOGLE_ID,
                to: email,
                subject: 'Password Reset OTP',
                text: `Your OTP for password reset is: ${otpCode}`,
            });
            res.json({ message: 'OTP sent to email' });
        } catch (error) {
            console.error('Error sending OTP email:', error);
            res.status(500).json({ message: 'Error sending OTP email' });
        }

    } catch (error) {
        console.error('Error in forget password:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        const otpRecord = await Otp.findOne({ email,  otp });
        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        await Otp.deleteOne({ _id: otpRecord._id });
        res.json({ message: 'OTP verified successfully' });
    }
    catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return res.status(400).json({ message: 'Email and new password are required' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters long' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Server error' });
    }

};

exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, address, city, postalCode, preferences } = req.body;
        const userId = req.user.id;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        if (city) user.city = city;
        if (postalCode) user.postalCode = postalCode;
        if (preferences) user.preferences = preferences;
        
        if (req.file) {
            user.profileImage = req.file.filename;
        }

        await user.save();
        
        const updatedUser = await User.findById(userId).select('-password');
        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

exports.uploadProfileImage = upload.single('profileImage');
