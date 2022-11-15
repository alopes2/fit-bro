import { Router } from 'express';
import { get } from '../controllers/home';

const router: Router = Router();

router.get('/', get);

export default router;
