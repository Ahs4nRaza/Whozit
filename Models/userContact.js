const mongoose = require('mongoose');

//  Schema for a contact
const contactInfoSchema = new mongoose.Schema ({
    Name : {
        type: String,
        required: true,
    },
    Email : {
        type: String,
        required: true,
    },
    Phone : {
        type: String,
        required: true,
    },
    Address : {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        required: true,
    },
    CreatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    }

})

// Create and export the Mongoose model for 'contacts' collection
module.exports = mongoose.model('contacts', contactInfoSchema);