import express, { Router, Request, Response } from 'express';
import { get } from '../controllers/worksheets';

const router: Router = express.Router();

router.get('/worksheets ', get);

export default router;
