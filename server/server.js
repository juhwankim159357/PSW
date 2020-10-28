const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require('path');

// CHANGE DATABASE IN .env
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


const api = require('./routes/index.js');
const PORT = process.env.PORT || 3001;
// moving mongoose.connect to dataService/data-service.js

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use('/api', api);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static ('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    })
    
}


app.listen(PORT, () => console.log(`Node.js Server is running on port ${PORT}`));

// We can change database here
// comment prpcess.env.MONGODB_URI
//
//
//
mongoose.connect(/*process.env.MONGODB_URI ||*/'mongodb+srv://admin:BthyMnJlVmZgZEt2@clusterpsw.rko8u.mongodb.net/PSW?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, (err) => {
  if(err) throw err;
  console.log("MongoDB connection established.");
});


// Set up routes
app.use("/", require("./routes/index"));


