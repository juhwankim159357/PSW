const express = require('express');
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

// Import Routes
const userRouter = require('./routes/userRouter');

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
app.use('/api/users', userRouter);

app.listen(PORT, () => console.log(`Node.js Server is running on port ${PORT}`));

// CHANGE DATABASE IN .env

// app.use(express.json());

// const api = require('./routes/index.js');
// app.use('/api', api);

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static ('client/build'));

//     app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
//     })
    
// }



// We can change database here
// comment prpcess.env.MONGODB_URI
// mongoose.connect(process.env.MONGODB_URI || PORT, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// }, (err) => {
//   if(err) throw err;
//   console.log("MongoDB connection established.");
// });

// ROUTES
// app.use()
// app.use("/", require("./routes/index"));

