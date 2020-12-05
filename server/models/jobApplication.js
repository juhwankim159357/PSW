// DEFINES DATABASE OBJECT FOR JOBS
const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
    applicant: {type: Object },
    jobPosting: {type: Object },
    status: {type: String},
});

// Use User to interact with User in database
module.exports = JobApplication = mongoose.model("jobApplication", jobApplicationSchema);
