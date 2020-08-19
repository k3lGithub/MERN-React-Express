const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Booking = require("../models/service/booking");

const secretKey = "87CB9E5B-7C0B-4717-8D14-CCC3C41B6BBB"; //GUID

// Public Routes
router.get("/", async (req, res, next) => {
  try {
    const allBooking = await Booking.find();

    res.json({
      status: {
        code: 200,
        message: "Success",
      },
      data: allBooking,
    });
  } catch (err) {
    res.json({
      status: {
        code: 503,
        message: err,
      },
    });
  }
});

// Authenticated Routes
// Later can refector to give option for non-users to book as well
router.use((req, res, next) => {
  const token = req.get("token");
  jwt.verify(token, secretKey, { algorithms: ["HS256"] }, (err, decode) => {
    if (!err) {
      req.user = decode;
      // console.log(decode);
      next();
    } else {
      res.json({
        status: {
          code: 401,
          message: "Please login",
        },
      });
    }
  });
});

router.post("/new", async (req, res) => {
  try {
    const booking = await Booking.findOne({ owner: req.user.userId });
    if (!booking) {
      req.body.owner = req.user.userId;
      // console.log("Current User",req.user);
      // console.log(req.body);
      const data = await Booking.create(req.body);
      // console.log(data);
      res.json({
        status: {
          code: 200,
          message: data,
        },
      });
    } else {
      res.json({
        status: {
          code: 401,
          message:
            "Booking already exists. To book for another time, go to 'My bookings' to cancel",
        },
      });
    }
  } catch {
    res.json({
      status: {
        code: 400,
        message: "Bad request",
      },
    });
  }
});

module.exports = router;
