const { Router } = require("express");


const { limiter } = require("../Service/FactoryHandler");
const Routes = Router();

Routes.route("/login").post(limiter, LoginValidator, Login);

module.exports = Routes;
