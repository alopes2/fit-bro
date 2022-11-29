import { getTrainings } from './../controllers/trainings';
import { Router } from 'express';
import {
  getLatestTraining,
  createNewTraining,
  deleteTraining,
} from '../controllers/trainings';

const router: Router = Router();

router.get('/trainings', getLatestTraining);

router.get('/trainings/list', getTrainings);

router.post('/trainings', createNewTraining);

router.delete('/trainings/:id', deleteTraining);

export default router;
