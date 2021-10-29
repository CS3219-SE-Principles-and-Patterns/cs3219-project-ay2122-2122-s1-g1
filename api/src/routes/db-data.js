var express = require("express");
const QuestionController = require("../controllers/QuestionController");
const UserController = require("../controllers/UserController");
const Middleware = require("../middlewares");
var router = express.Router();

// Questions
router.get("/getQuestions", QuestionController.getAllQuestion);
router.post("/addQuestion", QuestionController.addQuestion);
router.delete("/deleteQuestion", QuestionController.deleteQuestion);
router.put("/updateQuestion", QuestionController.updateQuestion);

// Users
router.put("/updateUser", Middleware.checkAuthenticated, UserController.addAnsweredQuestion);
router.get("/user", Middleware.checkAuthenticated, UserController.getUserData);

module.exports = router;