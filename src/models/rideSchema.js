import mongoose from "mongoose";

const rideSchema = mongoose.Schema({
  title: {
    type: "string",
  },
  description: {
    type: "string",
  },
  author: {
    type: "string",
  },

  // mongoose.Schema.Types.ObjectId tells model that users is another table in the collection
  // the ref states the table
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  startLocation: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  seats: {
    type: Number,
    default: 4,
    enum: [2,3,4,5,6],
    required: true,
  },
  departureDate: {
    type: String,
    required: true,

  },
  departureTime: {
    type: String,
    required: true,


}
}, {timestamps: true }

);



const Ride = mongoose.model("Ride", rideSchema);
export default Ride;
