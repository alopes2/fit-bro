import { Router } from 'express';
import {
  CreateExercises,
  DeleteExercises,
  GetExercises,
  UpdateExercises,
} from '../controllers/exercises';

const router: Router = Router({ mergeParams: true });

const baseUrl = '/exercises';

router.get(baseUrl, GetExercises);

router.post(baseUrl, CreateExercises);

router.put(`${baseUrl}/:exerciseId`, UpdateExercises);

router.delete(`${baseUrl}/:exerciseId`, DeleteExercises);

export default router;
