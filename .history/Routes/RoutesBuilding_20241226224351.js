const { Router } = require("express");



const { LoginValidator } = require("../Resuble/AuthvalidatorError");
const { Login } = require("../Services/AuthService");
const { limiter } = require("../Services/FactoryHandler");
const Routes = Router();

Routes.route("/").post(limiter, LoginValidator, Login);

module.exports = Routes;
