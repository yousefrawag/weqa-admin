const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: { type: String, default: null },
  pdf: { type: String, default: null }, 
  image: { type: String, default: null }, 
  createdAt: { type: Date, default: Date.now },
});
const ticketSchema = new mongoose.Schema(
  {
    _id: Number, // تأكد من أنك تحتاج إلى رقم كـ ID
    user: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
    messages: [messageSchema],

    status: { type: String, enum: ["open", "closed"], default: "open" },
    priority: {
      type: String,
      enum: ["low", "high", "critical"],
      default: "low",
    },
    Categoray: {
      type: String,
    },
  },
  { _id: false, timestamps: true }
);

ticketSchema.plugin(autoIncrement, { inc_field: "_id" });
ticketSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    populate: {
      path: "building",
    },
  });

  next();
});

const createTicketModel = mongoose.model("Ticket", ticketSchema);
module.exports = createTicketModel;
