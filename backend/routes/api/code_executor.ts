import { Router } from 'express';
import { submitCode, checkCodeResult } from '../../controllers/code_executor';
const router = Router();

router.post('/', submitCode);
router.post('/check-result', checkCodeResult);

export default router;
