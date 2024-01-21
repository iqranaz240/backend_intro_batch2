const express = require("express");
const router = express.Router();
const { checkIn, getMyAttandance, checkOut } = require('../controllers/atten')
const { verifyToken, checkRole } = require('../middlewares/authMiddleware')

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

// router.get("/", checkRole('admin'), geta);
router.post("/checkIn", checkIn)
router.get("/checkOut", checkOut)
router.delete("/getMyAttendance", getMyAttandance)
// router.get("/deleteUser", deleteUser)
// router.post("/updateUser", updateUser)
// router.post("/loginUser", loginUser)

module.exports = router;