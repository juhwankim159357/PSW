// moving contents to index.js
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware
const auth = require("../middleware/auth");

// Routers
const JobPosting = require("../models/jobModel");

router.get("/test", (req, res) => {
  res.send("job router working");
});

router.get("/", auth, async (req, res) => {
  // TODO GET ALL JOB POSTINGS
  // POST IN LIST
  try {
    const jobList = await JobPosting.find();
    res.send(jobList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/job-details", (req, res) => {
  //
});

router.post("/post-job", async (req, res) => {
  //TODO Make job posting form
  //add to jobs collection
  try {
    let {
      positionTitle,
      companyName,
      contractType,
      description,
      duties,
      requirements,
    } = req.body;

    const existingPosting = await JobPosting.findOne({
      positionTitle: positionTitle,
    });
    if (existingPosting && existingPosting.companyName == companyName)
      return res.status(400).json({
        message: "Duplicate posting, consider updating number of hires.",
      });

    const newJobPost = new JobPosting({
      positionTitle,
      companyName,
      contractType,
      description,
      duties,
      requirements,
    });
    const savedJobPost = await newJobPost.save();
    res.json(savedJobPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
