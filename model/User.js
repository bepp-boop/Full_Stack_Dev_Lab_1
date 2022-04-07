const mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    Name: { type: String },
    Age: { type: Number },
    Job: { type: String },
    ID: { type: Number, required: false }
});

userSchema.plugin(autoIncrement, { id: 'order_seq', inc_field: 'ID' })

module.exports = mongoose.model('Lab_1', userSchema)