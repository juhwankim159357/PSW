// moving contents to index.js
const router = require("express").Router();
const { default: Axios } = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const axios = require("axios");

const storage = multer.diskStorage({
  destination: "./public/resumes",
  filename: function (req, file, cb) {
    cb(null, "resume-" + Date.now() + path.extname(file.originalname));
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
const File = require("../models/fileModel");
const { doesNotMatch } = require("assert");

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
    let { email, password, confirmPassword, userRole, userName } = req.body;

    // Validation
    if (!email || !password || !confirmPassword || !userRole)
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
      userRole,
      userName,
    });
    const savedUser = await newUser.save();
    // Send the savedUser object back to front end
    res.json(savedUser);
  } catch (err) {
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
      },
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/:userName", (req, res) => {
  User.findOne({ userName: req.params.userName })
    .then((userFound) => {
      if (!userFound) {
        return res.status(404).end();
      }
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

// Update
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
      res.status(403).send("No user with that email exists in the database.");
    } else {
      const token = crypto.randomBytes(32).toString("hex");

      user.resetPasswordToken = token;
      user.resetPasswordTokenExpiry = Date.now() + 3600000;

      user.save();

      console.log("User Token ---: ", user.resetPasswordToken);
      console.log("User Token Exp ---: ", user.resetPasswordTokenExpiry);

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
          `https://psw-server.herokuapp.com/api/users/reset/${token}\n\n` +
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

router.get("/reset-password/:token", (req, res) => {
  console.log(req.params.token);
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordTokenExpiry: {
      $gt: Date.now(),
    },
  }).then((user) => {
    if (user === null) {
      console.log("Pasword reset link is invalid or has expired.");
      res.json("Pasword reset link is invalid or has expired.");
    } else {
      res.status(200).send({
        userName: user.userName,
        message: "Link is good.",
      });
    }
  });
});

router.post("/change-password", async (req, res) => {
  const salt = await bcrypt.genSalt();
  console.log("In change-password");
  
  User.findOne({
    userName: req.body.userName,
  }).then((user) => {
    if (user) {
      console.log("User exists.");
      bcrypt
        .hash(req.body.password, salt)
        .then((hashedPassword) => {
          user.password = hashedPassword;
          user.resetPasswordToken = null;
          user.resetPasswordTokenExpiry = null;
          user.save();
        })
        .then(() => {
          console.log("Password update");
          res.status(200).send({ message: "Password updated." });
        });
    } else {
      console.log(
        "No user with this username exists in this database to update."
      );
      res
        .status(404)
        .json("No user with this username exists in this database to update.");
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

router.post("/upload", auth, upload.single("myFile"), (req, res) => {
  // TODO CLEANUP
  // console.log("Request ---", req.body);
  // console.log("Request user ---" , req.user);
  // console.log("Request file ---", req.file);

  const file = new File({
    meta_data: req.file,
    user_id: req.user,
  });

  let savedFile = file;

  savedFile.save().then(() => {
    res.send(savedFile);
  });
});

module.exports = router;
