const { Router } = require("express");
const { LoginValidator } = require("../Resuble/AuthvalidatorError");
const { Login } = require("../Service/AuthService");

const { limiter } = require("../Service/FactoryHandler");
const Routes = Router();

Routes.route("/login").post(limiter, LoginValidator, Login);

module.exports = Routes;
