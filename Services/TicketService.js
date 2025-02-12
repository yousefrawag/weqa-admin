const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createTicketModel = require("../Models/createTicket");

exports.createTicket = expressAsyncHandler(async (req, res, next) => {
  try {
    const newTicket = new createTicketModel({
      user: req.user.id,
      messages: [{ senderId: req.user.id, text: req.body.message }],
      priority: req.body.priority || "low",
    });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
exports.sendMessage = expressAsyncHandler(async (req, res, next) => {
  const { ticketId } = req.params;
  const { senderId, text } = req.body;

  try {
    const ticket = await createTicketModel.findById(ticketId);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    ticket.messages.push({ senderId, text });
    ticket.updatedAt = new Date();
    await ticket.save();

    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

exports.getTicket = expressAsyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Unauthorized" });
  try {
    const tickets = await createTicketModel.find().populate("userId", "name email");
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
exports.updateTicket =expressAsyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Unauthorized" });
  try {
    const ticket = await createTicketModel.findByIdAndUpdate(req.params.ticketId, { priority: req.body.priority }, { new: true });
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
exports.deleteTicket = factory.deleteOne(createTicketModel);
