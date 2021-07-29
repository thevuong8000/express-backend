import { Router } from 'express';
import loginRoutes from './login';
import userRoutes from './users';
import codeExecutorRoutes from './code_executor';

const router = Router();

router.use('/login', loginRoutes);
router.use('/users', userRoutes);
router.use('/code-executor', codeExecutorRoutes);

export default router;
