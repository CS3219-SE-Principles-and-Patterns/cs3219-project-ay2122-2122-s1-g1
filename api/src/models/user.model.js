const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const { redisClient, DEFAULT_EXPIRATION } = require("../../config/redisConnection")

//define schema
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  isAdmin: {
    type: Boolean, 
    required: true
  },
  easyQuestionsDone: {
    type: Array,
    questionsDone: [{
      questionNumber: String,
      answer: String
    }]
  },
  mediumQuestionsDone: {
    type: Array,
    questionsDone: [{
      questionNumber: String,
      answer: String
    }]
  },
  hardQuestionsDone: {
    type: Array,
    questionsDone: [{
      questionNumber: String,
      answer: String
    }]
  } 
});

//define schema level methods to create access token and refresh token:
userSchema.methods = {
    createAccessToken: async function () {
        try {
            let { _id, username, isAdmin } = this;
            let accessToken = jwt.sign(
                { user: { _id, username, isAdmin } },
                ACCESS_TOKEN_SECRET,
                { expiresIn: "10m",}
            );
            return accessToken;
        } catch (error) {
            console.error(error);
            return;
        }
  },
  
  // Stored in redis
  createRefreshToken: async function () {
    try {
      let { _id, username, isAdmin } = this;
      let refreshToken = jwt.sign(
          { user: { _id, username, isAdmin } },
          REFRESH_TOKEN_SECRET,
          { expiresIn: DEFAULT_EXPIRATION.toString() + "s",} // Same expiration as that set in redis
      );
      redisClient.setex(refreshToken, DEFAULT_EXPIRATION, 0,
          (redisSetErr, reply) => {
              if (redisSetErr) console.log(redisSetErr);
              else console.log(reply);
          }
      );
      return refreshToken;
    } catch (error) {
        console.error(error);
        return;
    }
  },
};

//pre save hook to hash password before saving user into the database:
userSchema.pre("save", async function (next) {
  try {
    let salt = await bcrypt.genSalt(12); // generate hash salt of 12 rounds
    let hashedPassword = await bcrypt.hash(this.password, salt); // hash the current user's password
    this.password = hashedPassword;
  } catch (error) {
    console.error(error);
  }
  return next();
});

module.exports = mongoose.model("User", userSchema);