// moving contents to index.js
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware
const auth = require("../middleware/auth");
const { update } = require("../models/jobModel");

// Routers
const JobPosting = require("../models/jobModel");

router.get("/test", (req, res) => {
  res.send("job router working");
});

router.get("/", async (req, res) => {
  // TODO GET ALL JOB POSTINGS
  // POST IN LIST
  try {
    await JobPosting.find().then((jobs) => {
      res.send(jobs);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/job/:id", (req, res) => {
  JobPosting.findById(req.params.id)
    .then((jobPost) => {
      if (!jobPost) {
        return res.status(404).send("Job post not found.");
      }
      return res.status(200).json(jobFound);
    })
    .catch((err) => next(err));
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

router.post("/job/update/:id", (req, res) => {
  console.log("Updating job.");
  const id = req.params.id;

  JobPosting.findById(id, (err, jobPost) => {
    if (!jobPost) {
      res.status(404).send("Job posting not found.");
    } else {
      console.log("Job post: ---", jobPost);
      console.log("Req.body: ---", req.body);

      jobPost.positionTitle = req.body.positionTitle;
      jobPost.companyName = req.body.companyName;
      jobPost.contractType = req.body.contractType;
      jobPost.description = req.body.description;
      jobPost.duties = req.body.duties;
      jobPost.requirements = req.body.requirements;

      jobPost
        .save()
        .then((jobPost) => {
          res.json(jobPost).send("Job posting updated successfully!");
        })
        .catch((err) => res.status(500).send(err.message));
    }
  });
});

router.delete("/job/delete/:id", (req, res) => {
  const id = req.params.id;

  JobPosting.findById(id, (err, jobPost) => {
    if (!jobPost) {
      res.status(404).send("Job post not found.");
    } else {
      jobPost
        .delete()
        .then(() => res.json("Job Post deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

module.exports = router;
