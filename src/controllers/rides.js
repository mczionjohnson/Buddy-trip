import dotenv from "dotenv";
import Ride from "../models/rideSchema.js";
import RideOffer from "../models/rideOfferSchema.js";
import processDate from "../util/process_date.js";

dotenv.config();

class Rides {
  static async getAllRideOffers(req, res) {
    // db.query('SELECT * FROM ride_offers')
    try {
      const findAllRides = await Ride.find();
      const countAllRides = await findAllRides.length;
      res.status(200).json({
        status: "success",
        message: `${countAllRides} ride offer(s) found`,
        Rides: findAllRides,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error. Please try again later",
      });
    }
  }

  static async getOneRideOffer(req, res) {
    // db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
    try {
      const id = req.params.id;
      const singleRide = await Ride.findOne({ _id: id });
      if (singleRide == null) {
        return res.status(404).json({
          status: "error",
          message: "Ride Offer does not exist",
        });
      } else {
        return res.status(200).json({
          status: "success",
          message: "Ride Offer found",
          Ride: singleRide,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error. Please try again later",
      });
    }
  }

  static async createRideOffer(req, res) {
    try {
      const {
        startLocation,
        destination,
        price,
        seats,
        departureDate,
        departureTime,
      } = req.body;

      // const query = 'INSERT INTO ride_offers(id, user_id, start_from,
      // destination, seat, departure_date, departure_time, updated_at, created_at)

      const processedDate = processDate(departureDate);

      const ride = new Ride({
        user: req.user._id,
        startLocation: startLocation,
        destination: destination,
        seats: seats,
        price: price,
        departureDate: processedDate,
        departureTime: departureTime,
      });

      const newestRide = await ride.save();
      if (newestRide != null) {
        console.log(newestRide);
        res.status(201).json({
          status: "success",
          message: "Ride offer was successfully created",
          Ride: newestRide,
        });
      } else {
        console.log(error);
        res.json({
          status: "error 2",
          message: "Internal server error. Please try again later",
          error: error.message,
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        status: "error 2",
        message: "Internal server error. Please try again later",
        error: error.message,
      });
    }
  }

  // static async deleteOneRideOffer(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const user_id = req.authData._id;
  //     // db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
  //     const singleRide = await Ride.findOne({ _id: id });

  //     console.log(singleRide.user, user_id);

  //     if (singleRide.user.equals(user_id)) {
  //       // db.query('DELETE FROM ride_offers WHERE id=$1', [req.params.id])
  //       const deletedRide = await Ride.deleteOne({ _id: id });
  //       res.status(200).json({
  //         status: "success",
  //         message: "Ride Offer was deleted successfully",
  //       });
  //     } else {
  //       res.status(403).json({
  //         status: "error",
  //         message: "You don't have permission to delete this Ride Offer",
  //       });
  //     }
  //   } catch (error) {
  //     res.status(500).json({
  //       status: "error",
  //       message: "Internal server error. Please try again later",
  //       error: error.message,
  //     });
  //   }
  // }

  static async createRideOfferRequest(req, res) {
    try {
      const id = req.params.id;

      const result = await Ride.find({ _id: id });
      if (result.length < 1) {
        // if (result.rowCount < 1) {
        res.status(404).json({
          status: "error",
          message: "Ride Offer does not exist",
        });
      } else {
        if (result.user === req.user._id) {
          res.status(400).json({
            status: "error",
            message: "You cannot request for your Ride Offer",
          });
        }
        if (result[0].seat < 1) {
          res.status(400).json({
            status: "error",
            message:
              "No available seat! You cannot request for this Ride Offer",
          });
        }
        const data = {
          ride: req.params.id,
          user: req.user._id,
          username: req.user.username,
        };
        const request = new RideOffer({
          ...data,
        });
        try {
          const newRequest = request.save();
          if (newRequest != null) {
            res.status(201).json({
              status: "success",
              message: "Request was successfully made",
              request: request,
            });
          }
        } catch (error) {
          console.log(error.message);
          res.status(201).json({
            status: "error",
            message: "Error creating request",
          });
        }
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: "error",
        message: "Internal server error. Please try again later",
      });
    }
  }

  // static getRideOfferRequestsForOneRide(req, res) {
  //   db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
  //     .then((resultOne) => {
  //       if (resultOne.rowCount < 1) {
  //         res.status(404).json({
  //           status: 'error',
  //           message: 'Ride Offer does not exist',
  //         });
  //       } else {
  //         if(resultOne.rows[0].user_id !== req.authData.user.id) {
  //           res.status(401).json({
  //             status: 'error',
  //             message: 'You can not view Requests for a Ride Offer you did not create'
  //           })
  //         } else {
  //           db.query('SELECT * FROM ride_offer_requests WHERE ride_id=$1', [req.params.id])
  //             .then((result) => {
  //               if (result.rowCount < 1) {
  //                 res.status(404).json({
  //                   status: 'error',
  //                   message: 'No Request was found for this Ride Offer',
  //                 });
  //               } else {
  //                 res.status(200).json({
  //                   status: 'success',
  //                   message: `Showing ${result.rowCount} Request(s) for this Ride Offer`,
  //                   requests: result.rows,
  //                 });
  //               }
  //             })
  //             .catch(() => {
  //               res.status(500).json({
  //                 status: 'error',
  //                 message: 'Internal server error. Please try again later',
  //               });
  //             });
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       res.status(500).json({
  //         status: 'error',
  //         message: 'Internal server error. Please try again later',
  //       });
  //     });
  // }

  // static respondToRideOfferRequest(req, res) {
  //   const { status } = req.body;

  //   db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.rideId])
  //     .then((resultOne) => {
  //       if (resultOne.rowCount < 1) {
  //         res.status(404).json({
  //           status: 'error',
  //           message: 'Ride Offer does not exist',
  //         });
  //       } else {
  //         db.query('SELECT * FROM ride_offer_requests WHERE id=$1', [req.params.requestId])
  //           .then((resultTwo) => {
  //             if (resultTwo.rowCount < 1) {
  //               res.status(404).json({
  //                 status: 'error',
  //                 message: 'Ride Offer Requests does not exist',
  //               });
  //             } else {
  //               if (resultOne.rows[0].user_id !== req.authData.user.id) {
  //                 res.status(403).json({
  //                   status: 'error',
  //                   message: 'You cannot accept or reject a Requests for a Ride you did not offer',
  //                 });
  //               } else {
  //                 if (resultTwo.rows[0].status !== 'pending') {
  //                   res.status(400).json({
  //                     status: 'error',
  //                     message: 'You cannot respond to this Ride Offer Request again',
  //                   });
  //                 } else {
  //                   if (status === 'rejected') {
  //                     db.query('UPDATE ride_offer_requests SET status=$1 WHERE id=$2', ['rejected', req.params.requestId])
  //                       .then(() => {
  //                         res.status(200).json({
  //                           status: 'success',
  //                           message: 'Request rejected',
  //                         });
  //                       })
  //                       .catch(() => {
  //                         res.status(500).json({
  //                           status: 'error',
  //                           message: 'Internal server error. Please try again later',
  //                         });
  //                       })
  //                   } else if (status === 'accepted') {
  //                     if (resultOne.rows[0].seat < 1) {
  //                       res.status(400).json({
  //                         status: 'error',
  //                         message: 'No seat available! You can no longer accept a Requests for this Ride Offer.',
  //                       });
  //                     } else {
  //                       db.query('UPDATE ride_offer_requests SET status=$1 WHERE id=$2', ['accepted', req.params.requestId])
  //                         .then(() => {
  //                           db.query('UPDATE ride_offers SET seat=seat-1 WHERE id=$1', [req.params.rideId])
  //                             .then(() => {
  //                               res.status(200).json({
  //                                 status: 'success',
  //                                 message: 'Request accepted',
  //                               });
  //                             })
  //                             .catch(() => {
  //                               res.status(500).json({
  //                                 status: 'error',
  //                                 message: 'Internal server error. Please try again later',
  //                               });
  //                             })
  //                         })
  //                         .catch(() => {
  //                           res.status(500).json({
  //                             status: 'error',
  //                             message: 'Internal server error. Please try again later',
  //                           });
  //                         })
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           })
  //           .catch(() => {
  //             res.status(500).json({
  //               status: 'error',
  //               message: 'Internal server error. Please try again later',
  //             });
  //           });
  //       }
  //     })
  //     .catch(() => {
  //       res.status(500).json({
  //         status: 'error',
  //         message: 'Internal server error. Please try again later',
  //       });
  //     });
  // }
}

export default Rides;
