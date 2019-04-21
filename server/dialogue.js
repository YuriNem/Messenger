const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DialogueSchema = new Schema(
    {
        username1: String,
        username2: String,
        messages: [{
            username: String,
            text: String,
        }],
    },
);

module.exports = mongoose.model('Dialogue', DialogueSchema);
