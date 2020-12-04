// DEFINES DATABASE OBJECT FOR JOBS
const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
    applicant: {type: Array },
    jobPosting: {type: Array},
    status: {type: String},
});

// Use User to interact with User in database
module.exports = JobApplication = mongoose.model("jobApplication", jobApplicationSchema);
