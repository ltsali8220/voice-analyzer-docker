import mongoose from "mongoose";

const TextSchema = new mongoose.Schema({
    inputText: String,
    outputText: String,
    mostFrequentlyUsedWord: String,
    uniqueWords: [String]
  });

export default mongoose.model("Text", TextSchema)
