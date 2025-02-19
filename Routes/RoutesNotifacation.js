const { Router } = require("express");

const { UtilsValidator } = require("../Resuble/UtilsValidationError");

const {
  getNotifacations,
  getNotifacation,
  deleteNotifacation,
} = require("../Services/NotifacationService ");
const {  protect } = require("../Services/AuthService");

const Routes = Router();
Routes.use(protect);
Routes.route("/").get(getNotifacations);
Routes.route("/:id")
  .get(UtilsValidator, getNotifacation)
  .delete(UtilsValidator, deleteNotifacation);
module.exports = Routes;
