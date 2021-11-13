const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    token: String,
    chat: []
});

module.exports = model('User', userSchema);