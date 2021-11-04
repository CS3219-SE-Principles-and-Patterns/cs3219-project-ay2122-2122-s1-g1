const User = require("../models/user.model");
const Question = require("../models/question.model");

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

exports.getQuestionsNotDoneBy = async (req, res) => {
    const difficulty = req.params.difficulty;
    console.log("Difficulty: " + difficulty);
    console.log("Difficulty type: " + (typeof difficulty));
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
        if (difficulty !== "easy" && difficulty !== "medium" && difficulty !== "hard") {
            return res.status(400).json({ error: "Difficulty level should be one of the following: easy, medium, hard" });
        }
        if (user === undefined) {
            return res.status(500).json({ error: "Internal server error! user is undefined" });
        }
        if (username === undefined) {
            return res.status(500).json({ error: "Internal server error! username is undefined" });
        }

        const filter = { username: username };

        var userDB = await User.findOne(filter).exec();
        var allQuestions = await Question.find().exec();

        var listOfQuestions;
        if (difficulty === "easy") {
            listOfQuestions = userDB.easyQuestionsDone;
        } else if (difficulty === "medium") {
            listOfQuestions = userDB.mediumQuestionsDone;
        } else { // hard
            listOfQuestions = userDB.hardQuestionsDone;
        }

        const questionsDone = new Set();

        // insert questions that are done to a set
        for (var index in listOfQuestions) {
            questionsDone.add(listOfQuestions[index].questionNumber);
        }

        var questionNotDone = [];

        // push the question that are not done to a list that is returned in the response later
        for (var index in allQuestions) {
            if (!questionsDone.has(allQuestions[index].questionNumber)) {
                questionNotDone.push(allQuestions[index]);
            }
        }

        if (userDB !== null) {
            return res.status(200).json({
                message: "Successful retrieval",
                data: questionNotDone,
            });
        } else {
            return res.status(500).json({ error: "Internal Server Error!" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};