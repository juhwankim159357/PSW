// moving contents to index.js
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware
const auth = require("../middleware/auth");

// Routers
const User = require("../models/userModel");
const { route } = require("./jobRouter");

router.get("/test", (req, res) => {
  res.send("~/users/test is working");
});

router.get("/testAuth", auth, async (req, res) => {
  res.send("~/users/auth middleware works!");
  console.log(req.user);
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json(user);
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        userRole: user.userRole,
      },
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
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

router.get("/testauth", auth, async(req, res) => {
  res.send(`auth works ${res.user}`);
})

module.exports = router;
