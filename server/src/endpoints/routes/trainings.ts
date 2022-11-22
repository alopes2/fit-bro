import { Router } from 'express';
import {
  get,
  createNewTraining,
  deleteTraining,
} from '../controllers/trainings';

const router: Router = Router();

router.get('/trainings', get);

router.post('/trainings', createNewTraining);

router.delete('/trainings/:id', deleteTraining);

export default router;
