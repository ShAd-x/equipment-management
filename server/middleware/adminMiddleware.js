const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
    next();
    // try {
    //     if (!req.user || !req.user.id) return res.status(403).json({ message: 'Accès refusé' });
    //     const user = await User.findById(req.user.id);
    //     if (user.role !== 'admin') {
    //         return res.status(403).json({ message: 'Accès refusé: administrateur uniquement' });
    //     }
    //     next();
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
};

module.exports = verifyAdmin;