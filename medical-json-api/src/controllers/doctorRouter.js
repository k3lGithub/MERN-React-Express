const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Doctor = require("../models/service/doctor");

const secretKey = "87CB9E5B-7C0B-4717-8D14-CCC3C41B6BBB"; //GUID

const findDoctor = async (req) => {
  return await Doctor.findOne({ name: req.body.name });
};

// Public Routes
router.get("/", async (req, res, next) => {
  try {
    const allDoctors = await Doctor.find();

    res.json({
      status: {
        code: 200,
        message: "Success",
      },
      data: allDoctors,
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

router.get("/:id", async (req, res) => {
  try {
    const data = await Doctor.findOne({ _id: req.params.id });
    if (data) {
      res.json({
        status: {
          code: 200,
          message: data,
        },
      });
    } else {
      res.json({
        status: {
          code: 400,
          message: "Doctor not found!",
        },
      });
    }
  } catch {
    res.statusjson({
      status: {
        code: 400,
        message: "Bad request",
      },
    });
  }
});

// Authenticated Routes
router.use((req, res, next) => {
  const token = req.get("token");
  jwt.verify(token, secretKey, { algorithms: ["HS256"] }, (err, decode) => {
    if (!err) {
      req.user = decode; //store user info on request object
      console.log(decode);
      if (decode.user == "admin@admin.com") {
        next();
      } else {
        res.json({
          status: {
            code: 401,
            message: "You are not authorized to access this page",
          },
        });
      }
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
  const foundDoctor = await findDoctor(req);

  // Validation check
  if (!foundDoctor) {
    console.log("reached here");
    try {
      const data = await Doctor.create(req.body);
      res.json({
        status: {
          code: 200,
          message: data,
        },
      });
    } catch {
      res.json({
        status: {
          code: 400,
          message: "Bad request",
        },
      });
    }
  } else {
    res.json({
      status: {
        code: 401,
        message: "Doctor already exists. Go to update instead.",
      },
    });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const data = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(data);
    if (data) {
      res.json({
        status: {
          code: 200,
          message: data,
        },
      });
    } else {
      res.json({
        status: {
          code: 404,
          message: "Doctor not found",
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

router.delete("/delete/:id", async (req, res) => {
  try {
    const data = await Doctor.findByIdAndDelete(req.params.id);
    if (data) {
      res.status(200).json(data);
      res.json({
        status: {
          code: 200,
          message: data,
        },
      });
    } else {
      res.json({
        status: {
          code: 404,
          message: "Doctor not found",
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
