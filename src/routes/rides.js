import express from 'express';

import checkAuth from '../middleware/auth.js';

import Rides from '../controllers/rides.js';

const rideRouter = express.Router();

rideRouter.get('/', checkAuth, Rides.getAllRideOffers);
rideRouter.get('/:id', checkAuth, Rides.getOneRideOffer);
// rideRouter.delete('/:id', checkAuth, Rides.deleteOneRideOffer);
rideRouter.post('/:id/requests', checkAuth, Rides.createRideOfferRequest);

export default rideRouter;
