import { Router } from 'express';
import loginRoutes from './login';
import userRoutes from './users';
import fileRoutes from './files';

const router = Router();

router.use('/login', loginRoutes);
router.use('/users', userRoutes);
router.use('/files', fileRoutes);

export default router;
