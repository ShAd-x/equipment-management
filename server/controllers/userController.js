const User = require('../models/User');
const bcrypt = require('bcryptjs');

const userController = {
    getAllUsers: async (_req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.json({ message: 'Utilisateur supprimé avec succès' });
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
    },

    updateUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // On cherche à mettre à jour les champs name, email, password et role
            if (req.body.name) {
                user.name = req.body.name;
            }
            if (req.body.email) {
                user.email = req.body.email;
            }
            if (req.body.password) {
                user.password = req.body.password;
            }
            if (req.body.role) {
                user.role = req.body.role;
            }

            const updatedUser = await user.save();
            res.json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user._id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateProfile: async (req, res) => {
        const { name, email, currentPassword, newPassword } = req.body;
        const userId = req.user._id;

        try {
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

          // Vérifier le mot de passe actuel si un nouveau mot de passe est fourni
          if (newPassword && currentPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
              return res.status(400).json({ message: 'Mot de passe actuel incorrect' });
            }
            user.password = await bcrypt.hash(newPassword, 10);
          }

          if (name) user.name = name;
          if (email) user.email = email;

          await user.save();

          res.json({ message: 'Profil mis à jour avec succès' });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    },
};

module.exports = userController;