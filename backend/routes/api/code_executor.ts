import { Router } from 'express';
import { submitCode } from '../../controllers/code_executor';
const router = Router();

router.post('/', submitCode);

export default router;
