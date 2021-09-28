require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const app = express();

const helmet = require('helmet')
const rateLimit = require("express-rate-limit");
const dataSanitizer = require("express-mongo-sanitize");
const xssCleaner = require("xss-clean");
const compression = require("compression");

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const appError = require("./utils/appError");
const globalErrorHandler = require("./controller/globalErrorHandler");
const userRouter = require("./route/userRoute");
const categoryRouter = require("./route/categoryRoute");
const productRouter = require("./route/productRouter");
const imageUploadRouter = require("./route/imageRoute");

app.use(compression());

app.use(helmet());

app.use(express.json({ limit: "10kb" }));
app.use(dataSanitizer());
app.use(xssCleaner());
const limitMiddleware = rateLimit({
  max: 3,
  windowMs: 15 * 1000,
  message: "request limit reached. Please try after one hour",
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//user
app.use("/user", userRouter);

//category
app.use("/api", categoryRouter);

//product
app.use("/api", productRouter);

//image
app.use("/api", imageUploadRouter);

app.use("*", (req, res, next) => {
  return next(new appError(`no such ${req.originalUrl} in server`, 400));
});
console.log(process.env.NODE_ENV);
//global error handler
app.use(globalErrorHandler);

module.exports = app;
