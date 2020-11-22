const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    user_id: "",
    meta_data: {}
});

module.exports = File = mongoose.model("file",fileSchema);