const { Router } = require("express");

const { UtilsValidator } = require("../Resuble/UtilsValidationError");

const {
  getNotifacations,
  getNotifacation,
  deleteNotifacation,
  updateNotifacation,
} = require("../Services/NotifacationService ");
const { allowedTo, protect } = require("../Services/AuthService");

const Routes = Router();
Routes.use(protect);
Routes.use(allowedTo("owner", "employee"));
Routes.route("/").get(getNotifacations);
Routes.route("/:id")
  .get(UtilsValidator, getNotifacation)
  .delete(UtilsValidator, deleteNotifacation)
  .put(UtilsValidator, updateNotifacation);
module.exports = Routes;
