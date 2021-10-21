var mongoose = require('mongoose');

// Setup schema
var questionSchema = new mongoose.Schema({
    questionNumber: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    questionName: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true
    },
    questionDescription: {
        type: String,
        required: true
    }
});

// var question = mongoose.model('Question', questionSchema);

// questionSchema.pre('save', (next) => {
//     var doc = this;
//     question.findByNumberAnd
// })

// Export Question model
module.exports = mongoose.model('Question', questionSchema);