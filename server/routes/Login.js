import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    const comparedPassword = bcrypt.compareSync(password, userDoc.password);
    if (comparedPassword) {
      // if Logged in responde with a json web token
      jwt.sign(
        { username, id: userDoc._id },
        process.env.SECRET,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          res.cookie('token', token).json({ id: userDoc._id, username });
        }
      );
    } else {
      res.status(401).json('Wrong credentials !');
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
