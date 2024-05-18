const User = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');
const TokenGenerator = require('uuid-token-generator');
const b2a = require('b2a');

const tokgen = new TokenGenerator();

exports.signUp = async (req, res) => {
    try {
        const { email, first_name, last_name, contact, password, role } = req.body;
        const username = first_name + last_name;
        const uuid = uuidv4();
        const encodedPassword = b2a.btoa(password);

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).send({ message: 'User already exists. Please login.' });
        }

        const newUser = new User({
            userid: Math.floor(Math.random() * 10000),
            email,
            first_name,
            last_name,
            username,
            contact,
            password: encodedPassword,
            role,
            isLoggedIn: false,
            uuid,
            accesstoken: '',
            coupens: [],
            bookingRequests: []
        });

        await newUser.save();
        res.status(200).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const encodedPassword = b2a.btoa(password);

        const user = await User.findOne({ username, password: encodedPassword });
        if (!user) {
            return res.status(400).send({ message: 'Invalid username or password' });
        }

        const accesstoken = tokgen.generate();
        user.accesstoken = accesstoken;
        user.isLoggedIn = true;
        await user.save();

        res.status(200).send({ message: "Login successfully", accesstoken });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        const { accesstoken } = req.body;

        const user = await User.findOne({ accesstoken });
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        user.accesstoken = '';
        user.isLoggedIn = false;
        await user.save();

        res.status(200).send({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getCoupons = async (req, res) => {
    try {
        const { userId } = req.query
        const user = await User.findOne({ userid: userId });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).json(user.coupens);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.bookShow = async (req, res) => {
    try {
        const { userId, coupon_code, show_id, tickets } = req.body;
        const user = await User.findOne({ userid: userId });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const reference_number = Math.floor(Math.random() * 100000);
        const bookingRequest = { reference_number, coupon_code, show_id, tickets };

        // Add booking request to user's booking requests
        user.bookingRequests.push(bookingRequest);
        await user.save();

        res.status(200).send({ message: "Your Ticket is Booked", reference_number });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};