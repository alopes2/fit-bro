import { Router } from 'express';
import {
  getWorksheetsByTrainingId,
  createWorksheetInTraining,
  deleteWorksheetInTraining,
  getWorksheetByWorksheetId,
} from '../controllers/worksheets';

import exercisesRoutes from './exercises';

const router: Router = Router({ mergeParams: true });

const baseUrl = '/worksheets';

router.get(baseUrl, getWorksheetsByTrainingId);

router.post(baseUrl, createWorksheetInTraining);

router.get(`${baseUrl}/:worksheetId`, getWorksheetByWorksheetId);

router.delete(`${baseUrl}/:worksheetId`, deleteWorksheetInTraining);

router.use(`${baseUrl}/:worksheetId`, exercisesRoutes);

export default router;
