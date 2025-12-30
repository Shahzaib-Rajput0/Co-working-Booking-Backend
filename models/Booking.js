const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
    },
    userPhone: {
      type: String,
      required: [true, "User phone is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: ["TABLE", "CABIN", "PODCAST"],
    },
    itemId: {
      type: Number,
      required: [true, "Item ID is required"],
    },
    itemName: {
      type: String,
      required: [true, "Item name is required"],
    },
    seats: {
      type: [Number],
      default: [],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    recurringDays: {
      type: [String],
      default: [],
    },
    pricePerDay: {
      type: Number,
      required: [true, "Price per day is required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "completed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
