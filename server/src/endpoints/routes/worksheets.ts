import { Router } from 'express';
import {
  getWorksheetsByTrainingId,
  createWorksheetInTraining,
  deleteWorksheetInTraining,
  getWorksheetByWorksheetId,
} from '../controllers/worksheets';

const router: Router = Router({ mergeParams: true });

const baseUrl = '/worksheets';

router.get(baseUrl, getWorksheetsByTrainingId);

router.post(baseUrl, createWorksheetInTraining);

router.get(`${baseUrl}/:worksheetId`, getWorksheetByWorksheetId);

router.delete(`${baseUrl}/:worksheetId`, deleteWorksheetInTraining);

export default router;
