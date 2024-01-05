const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const expressValidator = require('express-validator')
require("dotenv").config();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const providerRoutes = require("./routes/provider");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");






// app
const app = express();



mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        // useFindAndModify: false
        useCreateIndex: true
    })
    .then(() => console.log("DB Connected 😱"))

    mongoose.connection.on('error', err => {
        console.log(`DB connection error: ${err.message}`)
      });




// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


// routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", providerRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);






const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
 

//E:\Major_Project\13 CODE user signup\ecommerce