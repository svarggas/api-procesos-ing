const express = require("express");
const cors = require('cors')
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

//Middleware
const app = express();
dotenv.config();
app.use(cors({origin: '*'}));
app.use(express.json());

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB!")
);

//Routes Middlewares
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server up and running ${port}`));