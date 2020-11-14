const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  console.log("In auth");
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ message: "No authentication token, authorization denied." });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(400)
        .json({ message: "Token verification failed, authorization denied." });

    // Return user to client
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;