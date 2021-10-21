var express = require("express");
const QuestionController = require("../controllers/QuestionController");
const UserController = require("../controllers/UserController");
var router = express.Router();

// Questions
router.get("/getQuestions", QuestionController.getAllQuestion);
router.post("/addQuestion", QuestionController.addQuestion);
router.delete("/deleteQuestion", QuestionController.deleteQuestion);
router.put("/updateQuestion", QuestionController.updateQuestion);

// Users
router.put("/updateUser", UserController.addAnsweredQuestion);


module.exports = router;