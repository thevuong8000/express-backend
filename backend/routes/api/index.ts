import { Router } from 'express';
import loginRoutes from './login';
import userRoutes from './users';

const router = Router();

router.use('/login', loginRoutes);
router.use('/users', userRoutes);

export default router;
