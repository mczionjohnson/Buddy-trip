import express from 'express';

import Users from '../controllers/users.js';
import Rides from '../controllers/rides.js';

import checkAuth from '../middleware/auth.js';
import createRideValidation from '../middleware/validations/create_ride.js';

import rideRequestValidation from '../middleware/validations/request_response.js';

import updatePasswordValidation from '../middleware/validations/update_password.js';
import updatePhotoValidation from '../middleware/validations/update_photo.js';
import updateProfileValidation from '../middleware/validations/update_profile.js';

const userRouter = express.Router();

// userRouter.get('/', checkAuth, Users.getAllUsers);
userRouter.get('/:id', checkAuth, Users.getOneUser);
// userRouter.put('/:id/profile', checkAuth, updateProfileValidation, Users.updateUserProfile);
// userRouter.put('/:id/password', checkAuth, updatePasswordValidation, Users.updateUserPassword);
// userRouter.put('/:id/photo', checkAuth, updatePhotoValidation, Users.updateUserPhoto);

userRouter.post('/rides', checkAuth, createRideValidation, Rides.createRideOffer);
// userRouter.get('/rides/:id/requests', checkAuth, Rides.getRideOfferRequestsForOneRide);
// userRouter.put('/rides/:rideId/requests/:requestId', checkAuth, rideRequestValidation, Rides.respondToRideOfferRequest);

export default userRouter;
