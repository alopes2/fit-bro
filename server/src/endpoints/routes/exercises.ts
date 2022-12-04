import { Router } from 'express';
import {
  createExercises,
  deleteExercises,
  getExercises,
  updateExercises,
} from '../controllers/exercises';

const router: Router = Router({ mergeParams: true });

const baseUrl = '/exercises';

router.get(baseUrl, getExercises);

router.post(baseUrl, createExercises);

router.put(`${baseUrl}/:exerciseId`, updateExercises);

router.delete(`${baseUrl}/:exerciseId`, deleteExercises);

export default router;
