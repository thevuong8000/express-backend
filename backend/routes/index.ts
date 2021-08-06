import { Router } from 'express';
import auth from './auth';
import apiRoutes from 'api';
import errorHandlers from './error-handlers';
import { IS_STANDALONE } from '../constants/config';

const router = Router();

// Authentication
// Only authenticate if not standalone
if (!IS_STANDALONE) router.use(auth);

// API routes
router.use('/', apiRoutes);

// Error Handlers
router.use(errorHandlers);

export default router;
