import Ride from "../../models/rideSchema.js";
import processDate from "../../util/process_date.js";

const validate = async (req, res, next) => {
  try {
    if (
      !req.body.startLocation ||
      req.body.startLocation === undefined ||
      req.body.startLocation === null
    ) {
      return res.status(400).json({
        status: "error",
        message: "Please provide a Start Location",
      });
    }

    if (
      !req.body.destination ||
      req.body.destination === undefined ||
      req.body.destination === null
    ) {
      return res.status(400).json({
        status: "error",
        message: "Please provide a Destination",
      });
    }

    if (
      !req.body.price ||
      req.body.price === undefined ||
      req.body.price === null
    ) {
      return res.status(400).json({
        status: "error",
        message: "Please provide a price",
      });
    }

    if (
      !req.body.seats ||
      req.body.seats === undefined ||
      req.body.seats === null
    ) {
      return res.status(400).json({
        status: "error",
        message: "Please provide number of Seats available",
      });
    } else if (req.body.seats < 1) {
      return res.status(400).json({
        status: "error",
        message: "Number of Seats available must be at least, 1",
      });
    }

    if (
      !req.body.departureDate ||
      req.body.departureDate === undefined ||
      req.body.departureDate === null
    ) {
      return res.status(400).json({
        status: "error",
        message: "Please provide Departure Date",
      });
    }

    if (
      !req.body.departureTime ||
      req.body.departureTime === undefined ||
      req.body.departureTime === null
    ) {
      return res.status(400).json({
        status: "error",
        message: "Please provide Time of Departure",
      });
    }

    const dateProvided = Date.parse(req.body.departureDate);
    const currentDate = Date.parse(new Date());

    if (dateProvided < currentDate) {
      return res.status(400).json({
        status: "error",
        message: "Please provide a future date as Date of Departure",
      });
    }

    // db.query('SELECT * FROM ride_offers WHERE user_id=$1 AND departure_time=$2 AND departure_date=$3',
    // [req.authData.user.id, req.body.departureTime, req.body.departureDate])

    const processedDate = processDate(req.body.departureDate);

    const findDuplicateRide = await Ride.find({
      $and: [
        { user: req.user._id },
        { departureTime: req.body.departureTime },
        { departureDate: processedDate },
      ],
    });
    console.log(findDuplicateRide.length);

    if (findDuplicateRide.length <= 0) {
      console.log("no duplicate ride found, proceed")
      next();
    } else {
      res.status(400).json({
        status: "error",
        message: "You have a ride to offer at this time",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error 1",
      message: "Internal server error. Please try again later",
      error: error.message,
    });
  }
};

export default validate;
