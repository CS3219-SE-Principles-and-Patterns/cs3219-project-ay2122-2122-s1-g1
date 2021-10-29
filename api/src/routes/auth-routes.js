const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const Middleware = require("../middlewares");

router.post("/auth/signup", AuthController.signup);
router.post("/auth/login", AuthController.login);
router.post("/auth/refresh_token", AuthController.generateRefreshToken);
router.delete("/auth/logout", AuthController.logout);

//@access to only authenticated users
router.get("/authenticated_resource", Middleware.checkAuthenticated, (req, res) => {
  console.log("req: ", req)
  return res.status(200).json({ user: req.user });
});

//@access to only authenticated users
router.get("/authorized_resource", Middleware.checkAuthorized, (req, res) => {
  console.log("req: ", req)
  return res.status(200).json({ user: req.user });
});

module.exports = router;