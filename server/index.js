import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import fileUpload from "express-fileupload";

const app = express();

dotenv.config()

app.use(cors());
app.use(express.json());
app.use(fileUpload())
app.use(express.static('uploads'))

//const env
const PORT = process.env.PORT || 5000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

//routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

app.get('/', (req, res) => {
  res.send('Home page')
})


async function start () {
  try {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jgd7edn.mongodb.net/`);
    
    app.listen(PORT, () => console.log('server started on PORT: ' + PORT));
  } catch (error) {
    console.log(error);
  }
}
start();
