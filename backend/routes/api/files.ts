import { Router } from 'express';
import { uploadImage } from '@controllers/files';
import upload from '@middlewares/multer-config';
const router = Router();

/**
 * @swagger
 * tags:
 *   name: File
 *   description: File management and operations
 */

router.get('/', upload.single('image'), uploadImage);

export default router;
