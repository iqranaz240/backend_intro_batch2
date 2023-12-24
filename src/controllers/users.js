const express = require('express');
const router = express.Router();
const Users = require("../models/users");

const getUser = async (req, res) => {
    const allUsers = await Users.find();
    return res.send(allUsers);
}

const addUser = async (req, res) => {
    let newUser = req.body;
    console.log(newUser)

    try {
        const existingUser = await Users.findOne({ email: newUser.email });

        if (existingUser) {
            console.log("User already exists.");
            return res.send("User already exists.");
        } else {
            const user = await Users.create({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                password: newUser.password
            });

            return res.status(200).send({ user: user });
        }
    } catch (err) {
        return res.status(500).send("There was a problem registering the user.", err);
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const email = req.query.email;

        if (!email) {
            return res.status(400).send("Email parameter is required.");
        }

        const user = await Users.findOne({ email });

        if (user) {
            return res.status(200).send({ user });
        } else {
            return res.status(404).send("User not found.");
        }
    } catch (err) {
        return res.status(500).send("Error fetching user.");
    }
}

const deleteUser = async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).send("Email parameter is required.");
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found.");
        }

        const deleteUser = await Users.deleteOne(user);
        if (deleteUser) {
            return res.status(200).send(`${email} deleted successfully.`);
        } 
    } catch (err) {
        return res.status(500).send("Error deleting user.");
    }
}

module.exports = { getUser, addUser, getUserByEmail, deleteUser };
