import express from 'express';
import { createLocation, getLocationByPlaceId, getLocations, updateLocationById } from '../controllers/locationController';
import { addUserToRequest, sessionTokenAdmin } from '../middleware/auth';

const router = express.Router();

router.post('/create', sessionTokenAdmin, createLocation);
router.get(['/get', '/', ''], addUserToRequest, getLocations);
router.get('/getPlace/:placeId', getLocationByPlaceId)
router.post('/update', updateLocationById)

export default router;
