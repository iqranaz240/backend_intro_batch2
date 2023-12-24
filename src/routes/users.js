const express = require("express");
const router = express.Router();
const { getUser, addUser } = require("../controllers/users");

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

router.get("/", getUser);
router.post("/addUser", addUser)

module.exports = router;