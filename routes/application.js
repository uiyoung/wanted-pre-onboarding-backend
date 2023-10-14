import { Router } from 'express';
const router = Router();

import { applyJob } from '../controller/application.js';

router.post('/', applyJob);

export default router;
