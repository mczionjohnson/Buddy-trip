import dotenv from "dotenv";
import Ride from "../models/rideSchema.js";
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
        findAllRides,
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
      const { id } = req.params;
      const singleRide = await Ride.findOne({ _id: id });
      if (singleRide <= 0) {
        return res.status(404).json({
          status: "error",
          message: "Ride Offer does not exist",
        });
      } else {
        return res.status(200).json({
          status: "success",
          message: "Ride Offer found",
          singleRide,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error. Please try again later",
      });
    }
  }

  static createRideOffer(req, res) {
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
        user: req.authData._id,
        startLocation: startLocation,
        destination: destination,
        seats: seats,
        price: price,
        departureDate: processedDate,
        departureTime: departureTime,
      });

      const newestRide = ride
        .save()
        .then((result) => {
          res.status(201).json({
            status: "success",
            message: "Ride offer was successfully created",
            result,
          });
        })
        .catch(() => {
          res.json({
            status: "error 2",
            message: "Internal server error. Please try again later",
            error: error.message,
          });
        });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error 2",
        message: "Internal server error. Please try again later",
        error: error.message,
      });
    }
  }

  static async deleteOneRideOffer(req, res) {
    try {
      const { id } = req.params;
      const user_id = req.authData._id;
      // db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
      const singleRide = await Ride.findOne({ _id: id });

      console.log(singleRide.user, user_id);

      if (singleRide.user.equals(user_id)) {
        // db.query('DELETE FROM ride_offers WHERE id=$1', [req.params.id])
        const deletedRide = await Ride.deleteOne({ _id: id });
        res.status(200).json({
          status: "success",
          message: "Ride Offer was deleted successfully",
        });
      } else {
        res.status(403).json({
          status: "error",
          message: "You don't have permission to delete this Ride Offer",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error. Please try again later",
        error: error.message,
      });
    }
  }

  // static createRideOfferRequest(req, res) {
  //   db.query('SELECT * FROM ride_offers WHERE id=$1', [req.params.id])
  //     .then((result) => {
  //       if (result.rowCount < 1) {
  //         res.status(404).json({
  //           status: 'error',
  //           message: 'Ride Offer does not exist',
  //         });
  //       } else {
  //         if(result.rows[0].user_id === req.authData.user.id) {
  //           res.status(400).json({
  //             status: 'error',
  //             message: 'You cannot request for your Ride Offer',
  //           });
  //         } else {
  //           if (result.rows[0].seat < 1) {
  //             res.status(400).json({
  //               status: 'error',
  //               message: 'No available seat! You cannot request for this Ride Offer',
  //             });
  //           } else {
  //             const data = [
  //               randomstring.generate(10),
  //               req.params.id,
  //               req.authData.user.id,
  //               req.authData.user.name,
  //               'pending',
  //               new Date().toISOString(),
  //               new Date().toISOString(),
  //             ];

  //             db.query('INSERT INTO ride_offer_requests(id, ride_id, user_id, user_name, status, updated_at, created_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', data)
  //               .then((result) => {
  //                 res.status(201).json({
  //                   status: 'success',
  //                   message: 'Request was successfully made',
  //                   request: result.rows[0],
  //                 });
  //               })
  //               .catch(() => {
  //                 res.status(500).json({
  //                   status: 'error',
  //                   message: 'Internal server error. Please try again later',
  //                 });
  //               });
  //           }
  //         }
  //       }
  //     })
  //     .catch(() => {
  //       res.status(500).json({
  //         status: 'error',
  //         message: 'Internal server error. Please try again later',
  //       });
  //     });
  // }

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
