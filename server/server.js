const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TextModel  = require('./models/TranscribedModel');
const cors = require('cors')
dotenv.config();

app.use(cors())
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URL);

app.post('/store-text', async (req, res, next) => {
  const textData = new TextModel({
    inputText: req.body.inputText,
    outputText: req.body.outputText,
    mostFrequentlyUsedWord: req.body.mostFrequentlyUsedWord,
    uniqueWords: req.body.uniqueWords
  });
  textData.save();
  const texts = await TextModel.find({})
  res.send(texts)
});

app.get('/store-text', async (req, res) => {
  const texts = await TextModel.find({})
  res.send(texts)
})

app.listen(9000, () => console.log('Server is running'));    