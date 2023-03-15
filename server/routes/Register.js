import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const userDoc = await User.create({ username, password: hashedPassword });
    res.status(201).json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
