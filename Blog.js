const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    category: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Blog", blogSchema);
