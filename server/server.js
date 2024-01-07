import mongoose from 'mongoose';
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import TextModel from "./models/TranscribedModel.js"
const app = express();

dotenv.config();

app.use(cors())
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URL);
app.get('/',(req,res)=>{
  res.send('Hello, word')
})
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