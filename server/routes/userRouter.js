// moving contents to index.js
const router = require("express").Router();
const { default: Axios } = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

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

router.get("/test", (req, res) => {
  res.send("~/users/test is working");
});

router.get("/testAuth", auth, async (req, res) => {
  console.log(req.user);
  res.send("~/users/auth middleware works!");
});

router.post("/tokenIsValid", async (req, res) => {
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
  //let editData = {};
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

// TODO Update specifically for score.

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
  })
});

module.exports = router;
