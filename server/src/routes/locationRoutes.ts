import express from 'express';
import { createLocation, getLocations } from '../controllers/locationController';
import { addUserToRequest, authenticateAdminActions } from '../middleware/auth';

const router = express.Router();

router.get('/create', authenticateAdminActions, createLocation);
router.get('/get', addUserToRequest, getLocations);

export default router;
