const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { generateAccessToken, generateRefreshToken } = require("../utils/general");

// Sign Up
router.post("/signup", async (req, res) => {
    //Validate data before insert
    if (!req.body) return res.status(400).send({ msg: error.details[0].message });

    //Checking if the user already exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(200).send({ msg: "Email is already registered!" });

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {

        //Create a new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            is_active: true,
            cellphone: req.body.cellphone,
            address: req.body.address,
            refresh_token: ''
        });

        const newUser = await user.save();
        const refreshToken = generateRefreshToken(newUser);
        User.findByIdAndUpdate(newUser._id, {
            refresh_token: refreshToken
        }, { new: true })
        .then(user => {
            res.status(200).send({ 
                msg: "New user created successfully.",
                refreshToken
            });
        }).catch(err => {
            res.status(400).send(err);
        });
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }

});

// Log In
router.post("/signin", async (req, res) => {
    try {
        //Checking email
        if (!req.body.email) return res.status(400).send({ msg: "Email not recieved." });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(200).send({ msg: "The email does not exist." });

        //Checking password
        if (!req.body.password) return res.status(400).send({ msg: "Password not recieved." });

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(200).send({ msg: "Email and password does not match to any user registed." });

        //Create and assing a token
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        User.findByIdAndUpdate(newUser._id, {
            refresh_token: refreshToken
        }, { new: true })
        .then(() => {
            res.status(200).send({
                msg: "Logged in successfully",
                accessToken,
                refreshToken
            });
        }).catch(err => {
            res.status(400).send(err);
        });

    } catch (error) {
        res.status(400).send(error);
    }
});

// Log Out
router.put("/logout", async (req, res) => {
    try {
        //Checking token
        if (!req.body.token) return res.status(401).send({ msg: "Token not recieved." });

        const userWithtoken = await User.findOne({ refresh_token: req.body.token });
        if (!userWithtoken) return res.status(200).send({ msg: "Token does not exist." });

        //Delete refresh token
        User.findByIdAndUpdate(userWithtoken, {
            refresh_token: ''
        }, { new: true })
        .then(() => {
            res.status(200).send({ msg: "Logged out successfully." })
        }).catch(err => {
            res.status(400).send(err);
        });

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;