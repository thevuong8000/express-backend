import express from 'express';
import 'middlewares/multer-config';

export const uploadImage: express.RequestHandler = (req, res, next) => {
  console.log(req.file.filename);
};
