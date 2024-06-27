import mongoose from "mongoose";

const rideOfferSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ride: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Ride",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "started", "completed"],
      required: true,
    },
  },
  { timestamps: true }
);

const RideOffer = mongoose.model("RideOffer", rideOfferSchema);
export default RideOffer;
