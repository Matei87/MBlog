import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import loginRoute from './routes/Login.js';
import registerRoute from './routes/Register.js';
import profileRoute from './routes/Profile.js';
import logoutRoute from './routes/Logout.js';
import postRoute from './routes/Post.js';
import { fileURLToPath } from 'url';

/* CONFIG */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ROUTES */
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/profile', profileRoute);
app.use('/logout', logoutRoute);
app.use('/post', postRoute);

/* MONGODB */
try {
  await mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to DB');
} catch (error) {
  console.log(error);
}

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('../client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Backend is running on port:', PORT));
