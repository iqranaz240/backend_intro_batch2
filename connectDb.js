const mongoose = require('mongoose');

const connectToDatabase = async function () {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.uvfwj5u.mongodb.net/batch');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectToDatabase