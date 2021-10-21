const Question = require("../models/question.model");

exports.getAllQuestion = async (req, res) => {
    try {
        var questions = await Question.find().exec();
        // console.log("Question type: " + typeof questions);
        return res.status(200).json({
            message: "Successful retrieval",
            data: questions
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

exports.addQuestion = async (req, res) => {
    try { 
        const question = new Question({
            questionNumber:         req.body.number,
            questionName:           req.body.name,
            difficulty:             req.body.difficulty,
            questionDescription:    req.body.description
        });
        var qns = await question.save();
        if (qns === question) {
            return res.status(200).json({
                message: "Successful addition",
                data: question.toJSON()
            });
        } else {
            return res.status(500).json({ error: "Internal Server Error!" });
        }
    } catch (error) {
        if (error && error.code === 11000) {
            return res.status(400).json({ error: "Question number has been used" });
        }
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

exports.deleteQuestion = async (req, res) => {
    try { 
        if (req.body.number === undefined) {
            return res.status(400).json({ error: "Please provide question number in the request body" });
        }
        
        await Question.deleteOne({
            questionNumber: req.body.number
        });
        return res.status(200).json({ message: "Successful removal" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

// This is an atomic operation
exports.updateQuestion = async (req, res) => {
    try { 
        if (req.body.number === undefined) {
            return res.status(400).json({ error: "Please provide question number in the request body" });
        }

        const filter = {questionNumber: req.body.number};
        const update = {
            questionName:           req.body.name,
            difficulty:             req.body.difficulty,
            questionDescription:    req.body.description
        };

        var qns = await Question.findOneAndUpdate(filter, update, {
            new: true
        });
        if (qns != null) {
            return res.status(200).json({
                message: "Successful update",
                data: qns.toJSON()
            });
        } else {
            res.status(500).json({ 
                error: "Internal server error", 
                message: "Please include question number in the request body and ensure that the question number exists in DB."
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};
