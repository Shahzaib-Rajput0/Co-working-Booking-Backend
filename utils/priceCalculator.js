const calculatePrice = (type, seats, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const timeDiff = end.getTime() - start.getTime();
  const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

  let pricePerDay;
  let totalPrice;

  switch (type) {
    case "TABLE":
      pricePerDay = seats.length * 700;
      totalPrice = days * pricePerDay;
      break;
    case "CABIN":
      pricePerDay = 3600;
      totalPrice = days * pricePerDay;
      break;
    case "PODCAST":
      pricePerDay = 10000;
      totalPrice = days * pricePerDay;
      break;
    default:
      throw new Error("Invalid type");
  }

  return { pricePerDay, totalPrice };
};

module.exports = { calculatePrice };
