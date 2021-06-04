import { Router } from 'express';
import auth from './auth';
import apiRoutes from './api';

const router = Router();

// Authentication
router.use(auth);

// API routes
router.use('/', apiRoutes);

export default router;
