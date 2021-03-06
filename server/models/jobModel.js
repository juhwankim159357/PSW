// DEFINES DATABASE OBJECT FOR JOBS
const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema({
    positionTitle: {type: String, required: true, unique: true},
    companyName: {type: String, required: true},
    contractType: {type: String, required: true},
    description: {type: String, required: true},
    duties: {type: Array, "default": []},
    requirements: {type: Array, "default": []},
    applicants: {type: Array, "default": []},
    employerEmail: {type: String, required: true},
});

// Use User to interact with User in database
module.exports = JobPosting = mongoose.model("jobPosting", jobPostingSchema);

