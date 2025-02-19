const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
   
    levels: {
      type: String,
      enum: ["Ticket", "assets", "employee"],
      required: true,
    },
    allowed: {
      type: mongoose.Schema.Types.Mixed,
      refPath: "levels",
    },
    type: {
      type: String,
      enum: ["request", "maintenance", "update", "support"],
      required: true,
    },
    text: { type: String, required: true },
    status: { type: String, enum: ["unread", "read"], default: "unread" },
  },
  { timestamps: true }
);
notificationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "allowed",
  });

  next();
});
const createNotificationModel = mongoose.model(
  "Notification",
  notificationSchema
);

module.exports = createNotificationModel;
