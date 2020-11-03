// moving contents to index.js
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware
//const auth = require("../middleware/auth");

// Routers
const JobPosting = require("../models/jobModel");

router.get("/test", (req, res) => {
    res.send("job router working");
})

router.get("/", (req, res) => {
    // TODO GET ALL JOB POSTINGS
    // POST IN LIST
})

router.get("/job-details", (req, res) => {
    //
})

router.post("/addPosting", (req, res) => {
    //TODO Make job posting form
    //add to jobs collection
})



module.exports = router;