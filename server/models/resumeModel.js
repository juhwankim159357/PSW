const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    user_id: "",
    meta_data: {},
    createdAt: {type: Date},
});

module.exports = Resume = mongoose.model("Resume",resumeSchema);