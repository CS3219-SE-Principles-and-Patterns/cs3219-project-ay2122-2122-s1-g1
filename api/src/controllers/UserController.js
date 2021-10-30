const User = require("../models/user.model");

exports.addAnsweredQuestion = async (req, res) => {
    try { 
        if (req.body.userName === undefined) {
            return res.status(400).json({ error: "Please provide userName." });
        }
        if (req.body.difficulty === undefined) {
            return res.status(400).json({ error: "Please provide difficulty of question." });
        }
        if (req.body.number === undefined) {
            return res.status(400).json({ error: "Please provide question number." });
        }

        const difficulty = req.body.difficulty;
        const filter = { username: req.body.userName };
        var update; 
        if (difficulty === "easy") {
            update = {
                easyQuestionsDone: {
                    questionNumber:     req.body.number,
                    answer:             req.body.answer
                }
            };
        } else if (difficulty === "medium") {
            update = {
                mediumQuestionsDone: {
                    questionNumber:     req.body.number,
                    answer:             req.body.answer
                }
            };
        } else if (difficulty === "hard") {
            update = {
                hardQuestionsDone: {
                    questionNumber:     req.body.number,
                    answer:             req.body.answer
                }
            };
        } else {
            return res.status(400).json({ error: "Unkown difficulty of question provided. Difficult is one of the following: easy, medium, hard." });
        }

        var user = await User.findOneAndUpdate(filter, { $push: update }, {
            new: true
        });

        if (user !== null) {
            return res.status(200).json({
                message: "Successful update",
                data: user.toJSON()
            });
        } else {
            return res.status(500).json({ error: "Internal Server Error!" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

exports.getUserData = async (req, res) => {
    const user = req.user;
    console.log(JSON.stringify(user))
    var username;
    if (user.username !== undefined) {
        username = user.username;
    } 
    if (user.user !== undefined && user.user.username !== undefined) {
        username = user.user.username;
    }
    try { 
        if (user === undefined) {
            return res.status(500).json({ error: "Internal server error! user is undefined" });
        }
        if (username === undefined) {
            return res.status(500).json({ error: "Internal server error! username is undefined" });
        }

        const filter = { username: username };

        var userDB = await User.findOne(filter).exec();

        if (userDB !== null) {
            return res.status(200).json({
                message: "Successful retrieval",
                data: userDB.toJSON()
            });
        } else {
            return res.status(500).json({ error: "Internal Server Error!" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};