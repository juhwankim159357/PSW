// moving contents to index.js
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware
const auth = require("../middleware/auth");
const { update } = require("../models/jobModel");

// Routers
const User = require("../models/userModel");
const JobPosting = require("../models/jobModel");
const JobApplication = require('../models/jobApplication');
const Resume = require("../models/resumeModel");

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
      return res.status(200).json(jobPost);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/post-job", auth, async (req, res) => {
  //TODO Make job posting form
  //add to jobs collection
  console.log(req.user);
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
      posterId: req.user,
    });
    const savedJobPost = await newJobPost.save();
    res.json(savedJobPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/job/apply/:jobId", auth, async (req, res) => {
  try {
    const jobpost = await JobPosting.findById(req.params.jobId);
    const applicant = await User.findById(req.user);

    const newApplication = new JobApplication ({
      applicant: {
        id: applicant._id,
        email: applicant.email,
        contactInfo: {
          firstName: applicant.firstName,
          lastName: applicant.lastName,
          cellPhone: applicant.cellPhone,
        },
        pswScore: applicant.pswScore,
      },
      jobPosting: {
        id: jobpost._id,
        description: jobpost.description,
      }, 
    })

    const savedApp = await newApplication.save();

    // 
    jobpost.applicants.push(savedApp.applicant)
    jobpost.save();

    // User Model
    applicant.applications.push(savedApp.jobPosting);
    applicant.save();

    res.status(200).json(savedApp);
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

// TODO Email or Notify the employer somehow
// router.post("/forgot-password", (req, res) => {
//   console.log("In /forgot-password");

//   if (req.body.email === "") {
//     res.status(400).send("Email required.");
//   }

//   User.findOne({
//     email: req.body.email,
//   }).then((user) => {
//     if (user === null) {
//       console.error("No user with that email exists.");
//       res.status(403).send("No user with that email exists in the database.");
//     } else {
//       const token = crypto.randomBytes(32).toString("hex");

//       user.resetPasswordToken = token;
//       user.resetPasswordTokenExpiry = Date.now() + 3600000;

//       user.save();

//       console.log("User Token ---: ", user.resetPasswordToken);
//       console.log("User Token Exp ---: ", user.resetPasswordTokenExpiry);

//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: `${process.env.EMAIL_ADDRESS}`,
//           pass: `${process.env.EMAIL_PASSWORD}`,
//         },
//       });

//       const mailOptions = {
//         from: `${process.env.EMAIL_ADDRESS}`,
//         to: `${user.email}`,
//         subject: "Password reset link",
//         text:
//           "You are receiving this because you (or someone else) have requested a password reset for your account.\n\n" +
//           "Please click on the following link, or paste this into your browser to reset your password within one hour of receiving it: \n\n" +
//           `https://psw-server.herokuapp.com/api/users/reset/${token}\n\n` +
//           "If you did not request this, please ignore this email and your password will remain unchanged.\n",
//       };

//       console.log("Sending mail");

//       transporter.sendMail(mailOptions, (err, info) => {
//         if (err) {
//           //console.error("There was an error: ", err);
//           res.status(502).send("Bad gateway.");
//         } else {
//           //console.log("Info ---", info);
//           console.log("Mail sent");
//           res.status(200).json("Email sent.");
//         }
//       });
//     }
//   });
// });
module.exports = router;
