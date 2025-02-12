const express = require("express");
const {
  createTicket,
  sendMessage,
  getTicket,
  updateTicket,
} = require("../Services/TicketService");
const router = express.Router();

router.post("/create", createTicket);

router.post("/message/:ticketId", sendMessage);

router.get("/:userId", getTicket);
router.get("/update-priority/:ticketId", updateTicket);

module.exports = router;
