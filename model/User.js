const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: { type: String },
    Age: { type: Number },
    Job: { type: String },
    ID: { type: Number }
});

module.exports = mongoose.model('Lab_1', userSchema
)