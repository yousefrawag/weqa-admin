const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require("http");
const jwt = require("jsonwebtoken");
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
const RoutesNestSubCategoryAssets = require("./Routes/RoutesNestSubCategoryAssets");
const RoutesAssets = require("./Routes/RoutesAssets");
const RoutesTickets = require("./Routes/RoutesTicket");
const RoutesNotifacations = require("./Routes/RoutesNotifacation");
const RoutesStatistics = require("./Routes/RoutesStatistics");
const { protect, createFirstOwnerAccount } = require("./Services/AuthService");
const { Server } = require("socket.io");
const createTicketModel = require("./Models/createTicket");
const createEmployeeModel = require("./Models/createEmployee");
const uploadsPath = path.join(__dirname, "../uploads");
app.use(express.static(uploadsPath));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
createFirstOwnerAccount();

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
app.use("/api/v1/nestSubCategoryAssets", RoutesNestSubCategoryAssets);
app.use("/api/v1/assets", RoutesAssets);
app.use("/api/v1/tickets", RoutesTickets);
app.use("/api/v1/notifacation", RoutesNotifacations);
app.use("/api/v1/statistics", RoutesStatistics);

if (process.env.NODE_ENV === "devolopment") {
  app.use(morgan("dev"));
}
io.use(async (socket, next) => {
  let token = socket.handshake.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new Error("توكن المستخدم مطلوب"));
  }

  try {
    const decoded = jwt.verify(token, process.env.DB_URL);
    const user = await createEmployeeModel.findById(decoded.userId);

    if (!user) {
      return next(new Error("المستخدم غير موجود"));
    }

    if (!["user", "manager", "owner"].includes(user.role)) {
      return next(new Error("ليس لديك الصلاحية للوصول إلى هذا النظام"));
    }

    socket.user = user;
    next();
  } catch (err) {
    console.log(err);

    return next(new Error("توكن غير صالح"));
  }
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.user._id}`);

  socket.on("joinRoom", (ticketId) => {
    socket.join(ticketId.data);
  });

  socket.on("sendMessage", async (data) => {
    try {
      const ticket = await createTicketModel.findById(data.data.ticketId);
      if (!ticket) {
        return socket.emit("error", "التذكرة غير موجودة");
      }

      ticket.messages.push({
        senderId: socket.user._id,
        text: data.data.text,
        pdf: data.data.pdf,
        image: data.data.image,
      });
      await ticket.save();

      const newMessage = ticket.messages[ticket.messages.length - 1];

      io.to(data.data.ticketId).emit("receiveMessage", newMessage);
      io.to(data.data.ticketId).emit("newNotification", "رسالة جديدة وصلت");
    } catch (err) {
      console.error(err);
      socket.emit("error", "حدث خطأ أثناء إرسال الرسالة");
    }
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
