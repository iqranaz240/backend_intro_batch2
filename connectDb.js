const mongoose = require('mongoose');

const connectToDatabase = async function () {
    try {
        await mongoose.connect('mongodb+srv://<add your mongo db connection string>');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectToDatabase