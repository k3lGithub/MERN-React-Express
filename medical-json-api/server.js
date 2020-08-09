const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
// const session        = require('express-session')

require('./src/db/db');

// SET UP CORS AS MIDDLEWARE, SO any client can make a request to our server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// app.use(session({
//   secret: 'cookieseceret',
//   resave: false,
//   saveUninitialized: false
// }));

// CORS allows requests to come in from React
app.use(cors());

// Require the controller after the middleware
const userAuthRouter  = require('./src/controllers/userAuthRouter');
const productRouter = require('./src/controllers/productRouter');
const doctorRouter = require('./src/controllers/doctorRouter');


app.use('/api/user', userAuthRouter);
app.use('/api/product', productRouter);
app.use('/api/doctor', doctorRouter);


app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});