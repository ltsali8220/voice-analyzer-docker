const mongoose = require("mongoose");

const TextSchema = new mongoose.Schema({
    inputText: String,
    outputText: String,
    mostFrequentlyUsedWord: String,
    uniqueWords: [String]
  });

module.exports = mongoose.model("Text", TextSchema)
