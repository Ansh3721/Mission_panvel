const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, gender, age, username, password } = req.body;
        if (!name || !email || !gender || !age || !username || !password)
            return res.status(400).json({ message: 'All fields are required.' });

        const emailExists = await User.findOne({ email });
        const usernameExists = await User.findOne({ username });
        if (emailExists || usernameExists)
            return res.status(400).json({ message: 'Email or Username already exists.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, gender, age, username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ message: 'All fields are required.' });

        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({ message: 'Invalid username or password.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid username or password.' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                age: user.age,
                username: user.username
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};
