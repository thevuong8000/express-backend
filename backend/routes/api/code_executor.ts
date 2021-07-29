import { Router } from 'express';
import { compileAndExecuteCode } from '../../controllers/code_executor';
const router = Router();

router.post('/', compileAndExecuteCode);

export default router;
