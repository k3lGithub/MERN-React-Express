require('dotenv').config();
const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
// const session        = require('express-session')

/*
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
*/

//heroku environment variable
//NODE_ENV=production

const isProd = process.env.NODE_ENV === 'production';

if(isProd) {
  console.log("Express app running in production");
  app.use(express.static('./public'));
}

// SET UP CORS AS MIDDLEWARE, SO any client can make a request to our server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// CORS allows requests to come in from React
app.use(cors());



// Require the controller after the middleware
const userAuthRouter  = require('./src/controllers/userAuthRouter');
const productRouter = require('./src/controllers/productRouter');
const doctorRouter = require('./src/controllers/doctorRouter');
const bookingRouter = require('./src/controllers/bookingRouter');
const cartRouter = require('./src/controllers/cartRouter');


app.use('/api/user', userAuthRouter);
app.use('/api/product', productRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/cart', cartRouter);

if(isProd) {
  app.get('/*', (req, res) => {
    res.sendFile("./public/index.html", {root: './'});
  });
}

module.exports = app;