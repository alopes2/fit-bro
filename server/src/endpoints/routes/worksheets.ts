import { Router } from 'express';
import {
  get,
  createNewWorksheet,
  deleteWorksheet,
} from '../controllers/worksheets';

const router: Router = Router();

router.get('/worksheets', get);

router.post('/worksheets', createNewWorksheet);

router.delete('/worksheets/:id', deleteWorksheet);

export default router;
