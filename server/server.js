const express = require('express');
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

// Import Routes
// test git
const userRouter = require('./routes/userRouter');
const jobRouter = require('./routes/jobRouter');

const cors = require('cors');
const bodyParser = require("body-parser");
const path = require('path');

mongoose.connect(process.env.MONGODB_URI || PORT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, (err) => {
  if(err) throw err;
  console.log("MongoDB connection established.");
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

app.use(bodyParser.json());
app.get("/test", (req, res) => {
  res.send("HI test works from server.js");
})

app.use('/api/users', userRouter);
app.use('/api/jobs', jobRouter);

app.listen(PORT, () => console.log(`Node.js Server is running on port ${PORT}`));

module.exports = app