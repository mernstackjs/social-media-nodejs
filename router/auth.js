const router = require("express").Router();
const { createNewUser, loginUser } = require("../controller/auth");

router.post("/create-new-user", createNewUser);
router.post("/login", loginUser);

module.exports = router;
