const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: { type: String, required: true },
    status: { type: String, default: 'pending' },
    created_at: { type: Date, default: Date.now },
    customId: { type: String, unique: true },
});

module.exports = mongoose.model('Task', taskSchema);