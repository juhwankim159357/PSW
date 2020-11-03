// DEFINES DATABASE OBJECT FOR JOBS
const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema({
    positionTitle: {type: String, required: true, unique: true},
    companyName: {type: String, required: true},
    description: {type: String, required: true},
    duties: {type: String, required: true},
    requirements: {type: String, required: true},
    extraNotes: {type: String}
});

// Use User to interact with User in database
module.exports = User = mongoose.model("jobPosting", jobPostingSchema);

