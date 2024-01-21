const express = require('express');
const jwt = require('jsonwebtoken')
const Attendance = require("../models/attendance");

// const getUser = async (req, res) => {
//     const allUsers = await Users.find();
//     return res.send(allUsers);
// }

const checkIn = async (req, res) => {
    let newEntry = req.body;
    console.log(newEntry)

    try {
        const existingEntry = await Attendance.findOne({ email: newEntry.email, date: newEntry.date });

        if (Object.keys(newUser).length < 4) {
            return res.send("Data is incomplete.");
        }
        if (existingEntry) {
            console.log("Already checkedIn");
            return res.send("Attendance already marked.");
        }
        else {
            const atten = await Attendance.create({
                userEmail: newEntry.userEmail,
                checkIn: newEntry.checkIn,
                location: newEntry.location,
                date: newEntry.date
            });
            if (atten) {
                return res.status(200).send({ marked: true });
            }
        }
    } catch (err) {
        return res.status(500).send("There was a problem marking attendance.", err);
    }
}

const getMyAttandance = async (req, res) => {
    try {
        console.log(req)
        const email = req.query.email;

        if (!email) {
            return res.status(400).send("Email parameter is required.");
        }
        const token = req.headers['x-access-token'];
        console.log(token)
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        const decode = jwt.verify(token, "mySecret")
        console.log(decode);

        if (user.email === decode.email) {
            const record = await Attendance.find({ email });
            if (record) {
                return res.status(200).send({ user });
            }
            else {
                return res.status(404).send("Record not found.");
            }
        }
        else {
            return res.status(403).send("Forbidden to access.");
        }
    }
    catch (err) {
        return res.status(500).send("Error fetching records.");
    }
}

// const deleteUser = async (req, res) => {
//     try {
//         const email = req.query.email;
//         if (!email) {
//             return res.status(400).send("Email parameter is required.");
//         }

//         const user = await Users.findOne({ email });
//         if (!user) {
//             return res.status(400).send("User not found.");
//         }

//         const deleteUser = await Users.deleteOne(user);
//         if (deleteUser) {
//             return res.status(200).send(`${email} deleted successfully.`);
//         }
//     } catch (err) {
//         return res.status(500).send("Error deleting user.");
//     }
// }

const checkOut = async (req, res) => {
    try {
        const email = req.body.userEmail;
        const checkOut = req.body.checkOut;
        if (!email) {
            return res.status(400).send("Email parameter is required.");
        }

        const record = await Attendance.findOne({ email, date });
        if (!record) {
            return res.status(400).send("User not found.");
        }
        const updateDocument = {
            $set: {
                checkOut: checkOut,
            },
        };
        const update = await Attendance.updateOne(record, updateDocument);
        if (update) {
            return res.status(200).send(`${email} checkout successfully.`);
        }
    } catch (err) {
        return res.status(500).send("Error during checkout.");
    }
}

// const loginUser = async (req, res) => {
//     try {
//         const user = await Users.findOne({ email: req.body.email });
//         if (!user) return res.status(404).send('No user found.');

//         var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//         if (!passwordIsValid) return res.status(401).send({ auth: 'Invalid Password' });

//         var token = jwt.sign({ email: user.email, role: user.role }, "mySecret", {
//             expiresIn: 86400 // expires in 24 hours
//         });
//         console.log("Successfully loged in...")
//         return res.status(200).send({ auth: true, token: token });

//     }
//     catch (err) {
//         if (err) return res.status(500).send('Error on the server.');
//     }
// }

module.exports = { checkIn, getMyAttandance, checkOut };
