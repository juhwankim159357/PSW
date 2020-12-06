// moving contents to index.js
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Middleware
const auth = require("../middleware/auth");
const { update } = require("../models/jobModel");

// Routers
const User = require("../models/userModel");
const JobPosting = require("../models/jobModel");
const JobApplication = require("../models/jobApplication");
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
    const foundUser = await User.findById(req.user);

    if (foundUser.userRole == "Employer") {
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
        employerEmail: foundUser.email,
      });
      const savedJobPost = await newJobPost.save();
      res.json(savedJobPost);
    } else {
      return res.status(401).json({ message: "Unauthorized." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/job/apply/:jobId", auth, async (req, res) => {
  try {
    // add check to see if application already exists

    const jobpost = await JobPosting.findById(req.params.jobId);
    const applicant = await User.findById(req.user);
    //console.log(applicant.resumePath);

    const appResume = applicant.resumePath;

    const newApplication = new JobApplication({
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
    });
    
    const savedApp = await newApplication.save();

    // For employers
    jobpost.applicants.push(savedApp.applicant);
    jobpost.save();
    // User Model
    applicant.applications.push(savedApp.jobPosting);
    applicant.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    const mailOptions = appResume ? {
      from: `${process.env.EMAIL_ADDRESS}`,
      to: `${jobpost.employerEmail}`,
      subject: `New application to ${jobpost.positionTitle}`,
      attachments : [
        {
          filename: 'resume.docx',
          path: appResume,
        }
      ],
      text:
        `Applicant Name: ${applicant.contactInfo.firstName} ${applicant.contactInfo.lastName} \n` +
        `Applicant Score:  ${applicant.pswScore}\n` +
        `Applicant Email:  ${applicant.email} \n` +
        `Applicant Cell Number:  ${applicant.contactInfo.cellPhone}\n`,
        //`View their profile at:  https://psw-client.herokuapp.com/users/${applicant.userName}\n\n` +
        //`View your job posting at: https://psw-client.herokuapp.com/jobs/job/details/${jobpost._id}\n`,
    } : {
      from: `${process.env.EMAIL_ADDRESS}`,
      to: `${jobpost.employerEmail}`,
      subject: `New application to ${jobpost.positionTitle}`,
      text:
        `Applicant Name: ${applicant.contactInfo.firstName} ${applicant.contactInfo.lastName} \n` +
        `Applicant Score:  ${applicant.pswScore}\n` +
        `Applicant Email:  ${applicant.email} \n` +
        `Applicant Cell Number:  ${applicant.contactInfo.cellPhone}\n`,
        //`View their profile at:  https://psw-client.herokuapp.com/users/${applicant.userName}\n\n` +
        //`View your job posting at: https://psw-client.herokuapp.com/jobs/job/${jobpost._id}\n`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("There was an error: ", err);
        res.status(502).send("Mail failed to send.");
      } else {
        console.log("Mail sent");
      }
    });

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

module.exports = router;
