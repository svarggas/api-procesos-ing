const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Transform from string to Object_Id for MongoDB search 
const stringToObjectId = (data) => {
    var ObjectId = (mongoose.Types.ObjectId);
    return new ObjectId(data.toString());
};

// Authenticate user trying to access the server
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.sendStatus(401)

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = user

    next()
}

const generateAccessToken = user => jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
const generateRefreshToken = user => jwt.sign({ ...user }, process.env.REFRESH_TOKEN_SECRET)

module.exports = {
    stringToObjectId,
    authenticateToken,
    generateAccessToken,
    generateRefreshToken
}