import express from 'express';
import { createLocation, getLocations } from '../controllers/locationController';
import { addUserToRequest, sessionTokenAdmin } from '../middleware/auth';

const router = express.Router();

router.post('/create', sessionTokenAdmin, createLocation);
router.get('/get', addUserToRequest, getLocations);

export default router;
