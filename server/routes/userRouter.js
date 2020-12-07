// moving contents to index.js
const router = require("express").Router();
const { default: Axios } = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const JobPosting = require("../models/jobModel");

const storage = multer.diskStorage({
  destination: "./public/resumes",
  filename: function (req, file, cb) {
    cb(
      null,
      req.user +
        "-" +
        file.originalname.split(path.extname(file.originalname))[0] +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { filesize: 1000000 },
});

// Middleware
const auth = require("../middleware/auth");

// Routers
const { route } = require("./jobRouter");

// Models
const User = require("../models/userModel");
const Resume = require("../models/resumeModel");

router.get("/test", (req, res) => {
  console.log("Test");
  res.send("~/users/test is working");
});

router.get("/testAuth", auth, async (req, res) => {
  console.log(req.user);
  res.send("~/users/auth middleware works!");
});

router.post("/tokenIsValid", async (req, res) => {
  console.log("In /tokenIsValid");
  try {
    const token = req.header("x-auth-token");
    console.log(token);
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    // Return the verified user
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send("Something went wrong.");
      next();
    }
    res.json(users);
  });
});

router.post("/signup", async (req, res) => {
  try {
    let contactInfo = { ...req.body.contactInfo };
    let { email, password, confirmPassword, userRole, userName } = req.body;

    // Validation
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !userRole ||
      !contactInfo.firstName ||
      !contactInfo.lastName ||
      !contactInfo.cellPhone
    )
      return res
        .status(400)
        .json({ message: "Not all fields have been filled." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ message: "Password must be at least 5 characters long." });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords are not matching." });

    // TODO CHECK FOR VALID EMAIL, need regex

    // Check if there are existing users with same email
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ mesage: "Email already in use." });

    if (!userName) userName = email;

    // Salt password, default genSalt(10)
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // newUser object to be saved
    const newUser = new User({
      email,
      password: passwordHash,
      contactInfo,
      userRole,
      userName,
    });

    console.log("New user ---", newUser);

    const savedUser = await newUser.save();
    // Send the savedUser object back to front end
    res.json(savedUser);
    console.log("end");
  } catch (err) {
    console.log("Caught error");
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validation
    if (!email || !password)
      return res.status(400).json({ msg: "Some fields are empty." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "No user with this email." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    // Stores unique _id from found user, lets us know which user has logged in
    // If we need a logged in used, we pass the token.
    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user: {
        userName: user.userName,
        email: user.email,
        userRole: user.userRole,
        contactInfo: user.contactInfo,
        pswScore: user.pswScore,
        applications: user.applications,
      },
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/:userName", (req, res) => {
  const userData = {};

  User.findOne({ userName: req.params.userName })
    .then((userFound) => {
      if (!userFound) {
        return res.status(404).end();
      }
      console.log(userFound);
      return res.status(200).json(userFound);
    })
    .catch((err) => next(err));
});

router.get("/user", auth, (req, res) => {
  let userData = {};
  console.log("in user");
  console.log(userData);
  console.log(req.user);
  Axios.get(`/user/${req.user.userName}`)
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
      }
      console.log(userData.credentials);
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

router.post("/user/update/:id", (req, res) => {
  console.log("Updating user.");
  const id = req.params.id;

  User.findById(id, (err, user) => {
    if (!user) {
      res.status(404).send("User not found.");
    } else {
      // console.log("User: ---", user);
      // console.log("Req.body", req.body);

      user.email = req.body.email;
      user.userRole = req.body.userRole;
      user.userName = req.body.userName;

      user
        .save()
        .then((user) => {
          res.json(user).send("User profile updated successfully!");
        })
        .catch((err) => res.status(500).send(err.message));
    }
  });
});

router.delete("/user/delete/:id", (req, res) => {
  const id = req.params.id;

  User.findById(id, (err, user) => {
    if (!user) {
      res.status(404).send("User not found.");
    } else {
      user
        .delete()
        .then(() => res.json("User deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

router.post("/forgot-password", (req, res) => {
  console.log("In /forgot-password");

  if (req.body.email === "") {
    res.status(400).send("Email required.");
  }

  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user === null) {
      console.error("No user with that email exists.");
      res.status(403).json({message: "No user with that email exists in the database."});
    } else {
      const token = crypto.randomBytes(32).toString("hex");

      user.resetPasswordToken = token;
      user.resetPasswordTokenExpiry = Date.now() + 3600000;
      user.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      const mailOptions = {
        from: `${process.env.EMAIL_ADDRESS}`,
        to: `${user.email}`,
        subject: "Password reset link",
        text:
          "You are receiving this because you (or someone else) have requested a password reset for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to reset your password within one hour of receiving it: \n\n" +
          `https://psw-client.herokuapp.com/reset/${token}\n\n` +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n",
      };

      console.log("Sending mail");

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          //console.error("There was an error: ", err);
          res.status(502).send("Bad gateway.");
        } else {
          //console.log("Info ---", info);
          console.log("Mail sent");
          res.status(200).json("Email sent.");
        }
      });
    }
  });
});

// Checks token
router.post("/reset-password/:token", async (req, res) => {
  const salt = await bcrypt.genSalt();
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordTokenExpiry: {
      $gt: Date.now(),
    },
  }).then((user) => {
    if (user === null) {
      res.json("Pasword reset link is invalid or has expired.");
    } else {
      bcrypt
        .hash(req.body.password, salt)
        .then((hashedPassword) => {
          user.password = hashedPassword;
          user.resetPasswordToken = null;
          user.resetPasswordTokenExpiry = null;
          user.save();
        })
        .then(() => {
          res.status(200).send({ message: "Password updated." });
        });
    }
  });
});

router.post("/upload", auth, upload.single("MyResume"), async (req, res) => {
  const filePath = req.file.filename;
  const user = await User.findById(req.user);
  console.log("/upload req   ---", req);

  
  Resume.findOne({ user_id: req.user }, (err, exiFile) => {
    let savedFile;

    if (!exiFile) {
      const file = new Resume({
        meta_data: req.resume,
        user_id: req.user,
        createdAt: Date.now(),
      });
      savedFile = file;
    } else {
      console.log("Updating file");
      exiFile.meta_data = req.body.meta_data;
      exiFile.user_id = req.user;
      exiFile.createdAt = Date.now();

      savedFile = exiFile;

      user.resumePath = path.join(__dirname, `../public/resumes/${filePath}`);
      user.save();
    }
    savedFile.save().then(() => {
      res.status(200).send(savedFile);
    });
  });
});

router.get("/file/:name", (req, res, next) => {
  const options = {
    root: path.join(__dirname, "../public/resumes"),
  };

  const fileName = req.params.name;

  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

router.post("/scoring", auth, async (req, res) => {

  const user = await User.findByIdAndUpdate(req.user, {
    pswScore: req.body.points,
  }).catch((err) => {
    console.log(err);
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  const mailOptions = {
    from: `${process.env.EMAIL_ADDRESS}`,
    to: `${user.email}`,
    subject: "Confrimation Application",
    text:
      "You successfully appied for postion\n\n" +
      "If you are quilified candidate, we will contacts you to set an interview by mail  \n\n" +
      "Once again thank you for apply\n" +
      "Have a nice day!",
  };

  console.log("Sending mail");

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      //console.error("There was an error: ", err);
      res.status(502).send("Bad gateway.");
    } else {
      //console.log("Info ---", info);
      console.log("Mail sent");
      res.status(200).json("Email sent.");
    }
  });
});

module.exports = router;
