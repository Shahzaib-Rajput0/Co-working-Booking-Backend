const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getUserBookings,
  deleteBooking,
} = require("../controllers/bookingController");

router.post("/", createBooking);

router.get("/", getAllBookings);

router.get("/user/:phone", getUserBookings);

router.delete("/:id", deleteBooking);

module.exports = router;
