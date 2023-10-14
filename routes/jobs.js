import { Router } from 'express';
const router = Router();

import {
  getJobs,
  postJob,
  getJobById,
  updateJob,
  deleteJob,
} from '../controller/jobs.js';

router.get('/', getJobs);
router.post('/', postJob);
router.route('/:id').get(getJobById).patch(updateJob).delete(deleteJob);

export default router;
