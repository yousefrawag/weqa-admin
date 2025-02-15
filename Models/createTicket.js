const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const ticketSchema = new mongoose.Schema(
  {
    _id: Number, // تأكد من أنك تحتاج إلى رقم كـ ID
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    messages: [
      {
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: { type: String, enum: ["open", "closed"], default: "open" },
    priority: {
      type: String,
      enum: ["low", "high", "critical"],
      default: "low",
    },
  },
  { _id: false, timestamps: true }
);

ticketSchema.plugin(autoIncrement, { inc_field: "_id" });

const createTicketModel = mongoose.model("Ticket", ticketSchema);
module.exports = createTicketModel;
