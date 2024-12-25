const express = require("express");
const cors = require("cors");

const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const dbCollection = require("./config/config");
const ApiError = require("./Resuble/ApiErrors");
const { default: rateLimit } = require("express-rate-limit");
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})
app.use(cors());
app.use(express.json({ limit: "50kb" }));
dotenv.config({ path: "config.env" });

dbCollection();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
// MiddleWare
if (process.env.NODE_ENV === "devolopment") {
  app.use(morgan("dev"));
}
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Listen on the ${PORT}`);
});

app.all("*", (req, res, next) => {
  next(new ApiError(`Sorry Can't find This url:${req.originalUrl}`, 400));
});

process.on("unhandledRejection", (err) => {
  console.log(`Server rejected ${err.name}`);
  server.close(() => {
    process.exit(1);
  });
});
