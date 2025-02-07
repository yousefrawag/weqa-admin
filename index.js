const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require("http");

const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const dbCollection = require("./config/config");
const ApiError = require("./Resuble/ApiErrors");
const RoutesAuth = require("./Routes/RoutesAuth");
const RoutesEmployee = require("./Routes/RoutesEmployee");
const RoutesPermission = require("./Routes/RoutesPermission");
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
const RoutesTickets = require("./Routes/RoutesTicket");
const { protect } = require("./Services/AuthService");
const { Server } = require("socket.io");
const { createPermissions } = require("./Services/PermissionService");
const createTicketModel = require("./Models/createTicket");
const uploadsPath = path.join(__dirname, "../uploads");
app.use(express.static(uploadsPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50kb" }));
dotenv.config({ path: "config.env" });
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
  ],
  methods: "GET,POST,PUT,DELETE , PATCH ",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
app.use(cors(corsOptions));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
  },
});
dbCollection();
createPermissions();
app.use("/api/v1/auth", RoutesAuth);
app.use(protect);
app.use("/api/v1/employee", RoutesEmployee);
app.use("/api/v1/permission", RoutesPermission);
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
app.use("/api/v1/tickets", RoutesTickets);

if (process.env.NODE_ENV === "devolopment") {
  app.use(morgan("dev"));
}
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("joinRoom", (ticketId) => {
    socket.join(ticketId);
  });

  socket.on("sendMessage", async (data) => {
    const ticket = await createTicketModel.findById(data.ticketId);
    ticket.messages.push({ senderId: data.senderId, text: data.text });
    await ticket.save();
    io.to(data.ticketId).emit("receiveMessage", data);
    io.to(data.ticketId).emit("newNotification", "رسالة جديدة وصلت");
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listen on the ${PORT}`);
});

app.all("*", (req, res, next) => {
  next(new ApiError(`Sorry Can't find This url:${req.originalUrl}`, 400));
});
