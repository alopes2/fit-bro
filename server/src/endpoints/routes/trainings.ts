import { getTrainings } from './../controllers/trainings';
import { Router } from 'express';
import {
  getLatestTraining,
  createNewTraining,
  deleteTraining,
} from '../controllers/trainings';

import worksheetRoutes from './worksheets';

const router: Router = Router();

const baseUrl = '/trainings';

router.get(baseUrl, getLatestTraining);

router.get(`${baseUrl}/list`, getTrainings);

router.post(baseUrl, createNewTraining);

router.delete(`${baseUrl}/:id`, deleteTraining);

router.use(`${baseUrl}/:trainingId`, worksheetRoutes);

export default router;
