import { Router } from 'express';
import auth from './auth';
import apiRoutes from './api';
import errorHandlers from './error-handlers';

const router = Router();

// Authentication
router.use(auth);

// API routes
router.use('/', apiRoutes);

// Error Handlers
router.use(errorHandlers);

export default router;
