const { Router } = require("express");
const {
  createTicket,
  sendMessage,
  getTicket,
  updateTicket,
  getTickets,
  getMyTickets,
  deleteTicket,
} = require("../Services/TicketService");
const {
  protect,
  allowedTo,
  getLoggedUserData,
} = require("../Services/AuthService");
const { getPermissions } = require("../Services/Middleware");
const Routes = Router();
Routes.use(protect);
Routes.route("/myTickets").get(
  allowedTo("user"),
  getLoggedUserData,
  getMyTickets
);
Routes.route("/")
  .post(protect,getPermissions, createTicket)
  .get(allowedTo("employee", "owner"), getPermissions, getTickets);
Routes.route("/:id")
  .get(getPermissions, getTicket)
  .put(allowedTo("employee", "owner"), getPermissions, updateTicket)
  .delete(allowedTo("employee", "owner"), getPermissions, deleteTicket);

module.exports = Routes;
