const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    chat: { type: Schema.Types.Mixed, default: {} },
    token: String,
}, { minimize: false });

module.exports = model('User', userSchema);