const User = require('../models/User');

const userController = {
    getAllUsers: async (_req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createUser: async (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });

        if (!user.name || !user.email || !user.password || !user.role) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        try {
            const newUser = await user.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = userController;