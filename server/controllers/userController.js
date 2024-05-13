import User, { find } from '../models/User';

const userController = {
    getAllUsers: async (_req, res) => {
        try {
            const users = await find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createUser: async (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email
        });

        if (!user.name || !user.email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        try {
            const newUser = await user.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

export default userController;