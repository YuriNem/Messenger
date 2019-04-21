const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: String,
        password: String,
        username: String,
        dialogues: [String],
        active: Boolean,
        id: Number,
    },
);

module.exports = mongoose.model('User', UserSchema);
