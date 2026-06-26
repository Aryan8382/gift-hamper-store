const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer',
    },
    profileImage: {
        type: String,
        default: null,
    },
    phone: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: '',
    },
    postalCode: {
        type: String,
        default: '',
    },
    preferences: {
        type: String,
        default: '',
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
