const express = require("express");
const router = express.Router();
const { getUser, addUser, getUserByEmail, deleteUser, updateUser, loginUser } = require("../controllers/users");
const { verifyToken, checkRole } = require('../middlewares/authMiddleware')

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

router.get("/", checkRole('admin'), getUser);
router.post("/addUser", addUser)
router.get("/getUser", verifyToken, getUserByEmail)
router.delete("/deleteUser", deleteUser)
router.get("/deleteUser", deleteUser)
router.post("/updateUser", updateUser)
router.post("/loginUser", loginUser)

module.exports = router;