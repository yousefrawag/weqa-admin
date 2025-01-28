const express = require("express");
const cors = require("cors");
const path = require("path");
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
const RoutesMainCategoryAssets = require("./Routes/RoutesMainCategoryAssets");
const RoutesCategoryAssets = require("./Routes/RoutesCategoryAssets");
const RoutesSubCategoryAssets = require("./Routes/RoutesSubCategoryAssets");
const RoutesAssets = require("./Routes/RoutesAssets");
const { createFirstOwnerAccount } = require("./Services/AuthService");
const uploadsPath = path.join(__dirname, "../uploads");
app.use(express.static(uploadsPath));
const corsOptions = {
  origin: ['http://localhost:5173' , 'http://localhost:5174' , "http://localhost:5175" , "https://benevolent-bonbon-d611bc.netlify.app"], // specify the origin that you want to allow
  methods: 'GET,POST,PUT,DELETE , PATCH ', // specify the methods you want to allow
  allowedHeaders: 'Content-Type,Authorization', // specify the headers you want to allow
  credentials: true // Allow credentials to be included in the request

};
app.use(cors(corsOptions));
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
app.use("/api/v1/location", RoutesLocation);
app.use("/api/v1/mainCategoryAssets", RoutesMainCategoryAssets);
app.use("/api/v1/categoryAssets", RoutesCategoryAssets);
app.use("/api/v1/subCategoryAssets", RoutesSubCategoryAssets);
app.use("/api/v1/assets", RoutesAssets);
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
