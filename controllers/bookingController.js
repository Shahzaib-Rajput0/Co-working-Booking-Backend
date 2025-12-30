const Booking = require("../models/Booking");
const { checkDateOverlap } = require("../utils/dateValidator");
const { calculatePrice } = require("../utils/priceCalculator");

const createBooking = async (req, res, next) => {
  try {
    const {
      userName,
      userPhone,
      type,
      itemId,
      itemName,
      seats,
      startDate,
      endDate,
      recurringDays,
    } = req.body;

    if (!userName || !userPhone || !type || !itemId || !itemName || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const hasOverlap = await checkDateOverlap({
      type,
      itemId,
      seats: seats || [],
      startDate,
      endDate,
    });

    if (hasOverlap) {
      return res.status(400).json({
        success: false,
        message: "This booking overlaps with an existing booking",
      });
    }

    const { pricePerDay, totalPrice } = calculatePrice(
      type,
      seats || [],
      startDate,
      endDate
    );

    const booking = await Booking.create({
      userName,
      userPhone,
      type,
      itemId,
      itemName,
      seats: seats || [],
      startDate,
      endDate,
      recurringDays: recurringDays || [],
      pricePerDay,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ startDate: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

const getUserBookings = async (req, res, next) => {
  try {
    const { phone } = req.params;

    const bookings = await Booking.find({ userPhone: phone }).sort({
      startDate: -1,
    });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getUserBookings,
  deleteBooking,
};
