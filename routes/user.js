const router = require('express').Router();
const User = require('../models/User');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

// Get All Users
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json(err);
    }
})

// Get Single User
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(500).json(others);
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router