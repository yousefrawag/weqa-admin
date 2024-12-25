const { Router } = require("express");


const { limiter } = require("../Service/FactoryHandler");
const { LoginValidator } = require("../Resuble/AuthvalidatorError");
const { Login } = require("../Services/AuthService");
const Routes = Router();

Routes.route("/login").post(limite, LoginValidator, Login);

module.exports = Routes;
