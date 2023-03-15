import express from 'express';
import multer from 'multer';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import Post from '../models/Post.js';

const router = express.Router();
const uploadMiddleware = multer({ dest: 'uploads/' });

router.post('/', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const { title, summary, content } = req.body;
  const { token } = req.cookies;
  try {
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    fs.renameSync(path, `${path}.${ext}`);

    jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
      if (err) throw err;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: `${path}.${ext}`,
        author: info.id,
      });
      res.status(201).json(postDoc);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).populate('author', ['username']);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/', uploadMiddleware.single('file'), async (req, res) => {
  try {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = `${path}.${ext}`;
      fs.renameSync(path, newPath);
    }
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, summary, content } = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor =
        JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('You are not the author.');
      }
      await postDoc.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });
      res.status(200).json(postDoc);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
