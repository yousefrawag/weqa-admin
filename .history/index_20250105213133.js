const express = require("express");
const cors = require("cors");

const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const dbCollection = require("./config/config");
const ApiError = require("./Resuble/ApiErrors");
const RoutesAuth = require("./Routes/RoutesAuth");
const RoutesEmployee = require("./Routes/RoutesEmployee");
const RoutesMainCategory = require("./Routes/RoutesMainCategory");
const RoutesCategory = require("./Routes/RoutesCategory");
const RoutessubCategory = require("./Routes/RoutesSubCategory");
const RoutesNestSubCategory = require("./Routes/RoutesNestSubCategory");
const RoutesSubNestSubCategory = require("./Routes/RoutesSubNestSubCategory");
const RoutesBuilding = require("./Routes/RoutesBuilding");
const RoutesLocation = require("./Routes/RoutesLocation");
const { createFirstOwnerAccount } = require("./Services/AuthService");

app.use(cors());
app.use(express.json({ limit: "50kb" }));
dotenv.config({ path: "config.env" });
dbCollection();
createFirstOwnerAccount();
app.use("/api/v1/auth", RoutesAuth);
app.use("/api/v1/employee", RoutesEmployee);
app.use("/api/v1/mainCategory", RoutesMainCategory);
app.use("/api/v1/category", RoutesCategory);
app.use("/api/v1/subCategory", RoutessubCategory);
app.use("/api/v1/nestSubCategory", RoutesNestSubCategory);
app.use("/api/v1/subNestSubCategory", RoutesSubNestSubCategory);
app.use("/api/v1/building", RoutesBuilding);
app.use("/api/v1/building", RoutesLocation);
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
