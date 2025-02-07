const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
    messages: [
      {
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: { type: String, enum: ["open", "closed"], default: "open" },
    priority: { type: String, enum: ["low", "high", "critical"], default: "low" },

  },
  { timestamps: true }
);

const createTicketModel = mongoose.model("Ticket", ticketSchema);
module.exports = createTicketModel;
