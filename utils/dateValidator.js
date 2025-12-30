const Booking = require("../models/Booking");

const checkDateOverlap = async (bookingData) => {
  const { type, itemId, seats, startDate, endDate } = bookingData;

  const newStart = new Date(startDate);
  const newEnd = new Date(endDate);

  const existingBookings = await Booking.find({
    type,
    itemId,
    status: "active",
  });

  for (const booking of existingBookings) {
    const existingStart = new Date(booking.startDate);
    const existingEnd = new Date(booking.endDate);

    const hasDateOverlap = newStart <= existingEnd && newEnd >= existingStart;

    if (hasDateOverlap) {
      if (type === "TABLE") {
        if (seats && seats.length > 0 && booking.seats && booking.seats.length > 0) {
          const hasSeatOverlap = seats.some((seat) => booking.seats.includes(seat));
          if (hasSeatOverlap) {
            return true;
          }
        }
      } else {
        return true;
      }
    }
  }

  return false;
};

module.exports = { checkDateOverlap };
