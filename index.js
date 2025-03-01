const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require("http");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { Server } = require("socket.io");

// Import your configurations and routes
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
const createTicketModel = require("./Models/createTicket");
const createEmployeeModel = require("./Models/createEmployee");

dotenv.config({ path: "config.env" });

const app = express();
const uploadsPath = path.join(__dirname, "../uploads");

// **RATE LIMITER (To prevent abuse)**
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  keyGenerator: (req) => req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip,
});
app.use(limiter);

// **Serve static files**
app.use(express.static(uploadsPath));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// **CORS CONFIGURATION (Updated)**
const allowedOrigins = [
  "https://saar-weqa-admin.netlify.app",
  "https://saar-weqa-portal.netlify.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Not Allowed"));
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));

// **Handle preflight requests explicitly**
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// **Server setup**
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: allowedOrigins },
});

// **Connect to Database & Create First Owner**
dbCollection();
createFirstOwnerAccount();

// **Routes Setup**
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

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// **Socket.io Middleware**
io.use(async (socket, next) => {
  let token = socket.handshake.headers.authorization?.split(" ")[1];
  token = token?.replace(/^"(.*)"$/, "$1");

  if (!token) return next(new Error("User Token Required"));

  try {
    const decoded = jwt.verify(token, process.env.DB_URL);
    const user = await createEmployeeModel.findById(decoded.userId);

    if (!user) return next(new Error("User Not Found"));

    if (!["user", "manager", "owner"].includes(user.role)) {
      return next(new Error("Access Denied"));
    }

    socket.user = user;
    next();
  } catch (err) {
    console.log(err);
    return next(new Error("Invalid Token"));
  }
});

io.on("connection", (socket) => {
  socket.on("joinRoom", (data) => {
    socket.join(data.ticketId);
  });

  socket.on("sendMessage", async (data) => {
    try {
      const ticket = await createTicketModel.findById(data.ticketId).populate("messages.senderId");
      if (!ticket) return socket.emit("error", "Ticket Not Found");

      ticket.messages.push({
        senderId: socket.user._id,
        text: data.text,
        pdf: data.pdf,
        image: data.image,
      });
      await ticket.save();

      const populatedTicket = await createTicketModel.findById(ticket._id).populate("messages.senderId");
      const newMessage = populatedTicket.messages.pop();

      io.to(data.ticketId).emit("receiveMessage", newMessage);
      io.to(data.ticketId).emit("newNotification", "New Message Received");
    } catch (err) {
      console.error(err);
      socket.emit("error", "Error Sending Message");
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

// **Handle Undefined Routes**
app.all("*", (req, res, next) => {
  next(new ApiError(`Cannot find URL: ${req.originalUrl}`, 400));
});

// **Start Server**
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
