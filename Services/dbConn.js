const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
require("dotenv").config();

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB database using environment variable
    const connection = await mongoose.connect(process.env.DB_URL);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with error code if connection fails
  }
};

module.exports = connectDB; // Export the connectDB function for use in other modules
