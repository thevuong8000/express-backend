import { Router } from 'express';
import upload from 'middlewares/multer-config';
import { uploadImage } from 'controllers/files';
const router = Router();

/**
 * @swagger
 * tags:
 *   name: File
 *   description: File management and operations
 */

router.get('/', upload.single('image'), uploadImage);

export default router;
