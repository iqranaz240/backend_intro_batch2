const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    checkIn: {
        type: String,
        required: true
    },
    checkOut: {
        type: String,
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = attendance = mongoose.model("Attendance", attendanceSchema);