import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET, {}, (err, info) => {
    if (err) {
      throw err;
    }
    res.json(info);
  });
  res.send(req.cookies);
});

export default router;
