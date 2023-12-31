const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Users = require("../models/users");

const getUser = async (req, res) => {
    const allUsers = await Users.find();
    return res.send(allUsers);
}

const addUser = async (req, res) => {
    let newUser = req.body;
    let hashedPassword = bcrypt.hashSync(newUser.password, 8);
    console.log(newUser)

    try {
        const existingUser = await Users.findOne({ email: newUser.email });

        if (Object.keys(newUser).length < 4) {
            return res.send("User data is incomplete.");
        }
        if (existingUser) {
            console.log("User already exists.");
            return res.send("User already exists.");
        } 
        else {
            const user = await Users.create({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                password: hashedPassword
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

const updateUser = async (req, res) =>  {
    try {
        const email = req.query.email;
        const newPassword = req.body.password;
        if (!email) {
            return res.status(400).send("Email parameter is required.");
        }
 
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found.");
        }
        const updateDocument = {
            $set: {
               password: newPassword,
            },
         };
        const updateUser = await Users.updateOne(user, updateDocument);
        if (updateUser) {
            return res.status(200).send(`${email} updated successfully.`);
        } 
    } catch (err) {
        return res.status(500).send("Error updating user.");
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: 'Invalid Password' });

        console.log("Successfully loged in...")
        res.status(200).send({ auth: true, message: "Successfully loged in."});
    }
    catch (err) {
        if (err) return res.status(500).send('Error on the server.');
    }
}

module.exports = { getUser, addUser, getUserByEmail, deleteUser, updateUser, loginUser };
