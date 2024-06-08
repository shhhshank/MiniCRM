const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const customerRouter = require("./src/routes/Customer.route");
const cityRouter = require("./src/routes/City.route");
const stateRouter = require("./src/routes/State.route");

const customerConsumer = require("./src/recievers/Customer.sub");
const orderConsumer = require("./src/recievers/Order.sub");

const Receive = require("./src/rabbit/Recieve.class");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use("/customer", customerRouter);
app.use("/city", cityRouter);
app.use("/state", stateRouter);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

    new Receive("customer").execute(customerConsumer);
    new Receive("order").execute(orderConsumer);
  });
});
