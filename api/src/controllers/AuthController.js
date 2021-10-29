const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const { redisClient, DEFAULT_EXPIRATION } = require("../../config/redisConnection")

exports.signup = async (req, res) => {
    try {
        //check if username is already taken:
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({ error: "Username taken." });
        } else {
            // create new user and generate a pair of tokens and send
            user = await new User(req.body).save();
            let accessToken = await user.createAccessToken();
            let refreshToken = await user.createRefreshToken();
            return res.status(201).json({ accessToken, refreshToken });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

exports.login = async (req, res) => {
    try {
        //check if user exists in database:
        let user = await User.findOne({ username: req.body.username });
        //send error if no user found:
        if (!user) {
            return res.status(404).json({ error: "No user found!" });
        } else {
            //check if password is valid:
            let valid = await bcrypt.compare(req.body.password, user.password);
            if (valid) {
                //generate a pair of tokens if valid and send
                let accessToken = await user.createAccessToken();
                let refreshToken = await user.createRefreshToken();
                return res.status(201).json({ accessToken, refreshToken });
            } else {
                //send error if password is invalid
                return res.status(401).json({ error: "Invalid password!" });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

// Saved to redis
exports.generateRefreshToken = async (req, res) => {
    try {
        //get refreshToken
        const { refreshToken } = req.body;
        //send error if no refreshToken is sent
        if (!refreshToken) {
            return res.status(403).json({ error: "Access denied, token missing!" });
        } else {
            //query for the token to check if it is valid:
            redisClient.get(refreshToken, (redisErr, data) => {
                if (redisErr) { 
                    console.log(redisErr);
                }
                if (data) {
                    console.log("Refresh token found: " + refreshToken);
                    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
                    const accessToken = jwt.sign({ user: payload }, ACCESS_TOKEN_SECRET, {
                        expiresIn: "10m",
                    });
                    return res.status(200).json({ accessToken });
                } else {
                    return res.status(401).json({ error: "Token expired!" });
                }
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

exports.logout = async (req, res) => {
    try {
        //delete the refresh token saved in database:
        const { refreshToken } = req.body;
        console.log("Refresh token: ", refreshToken)
        await Token.findOneAndDelete({ token: refreshToken });
        return res.status(200).json({ success: "User logged out!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};