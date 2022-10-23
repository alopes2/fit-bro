import express, { Router, Request, Response } from 'express';
import { get } from '../controllers/exercises';

const router: Router = express.Router();

router.get('/', get);

export default router;
