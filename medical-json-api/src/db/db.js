// set up our db connection
const mongoose = require("mongoose");

// that is automatically created
const uri = process.env.MONGODB_URI || 'mongodb://localhost/medicalCentre';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err, " mongoose failed to connect");
});

mongoose.connection.on("disconncted", () => {
  console.log("Mongoose is disconnected");
});
