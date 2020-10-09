const app = require('./app')
require('./src/db/db');

app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});




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


