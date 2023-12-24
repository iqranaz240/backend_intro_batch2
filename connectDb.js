const mongoose = require('mongoose');

const connectToDatabase = async function () {
    try {
        await mongoose.connect('<user your connection url from mongo db>');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectToDatabase