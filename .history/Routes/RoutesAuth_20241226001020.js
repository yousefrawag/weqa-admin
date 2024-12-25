const { Router } = require("express");


const { limiter } = require("../Service/FactoryHandler");
const Routes = Router();

Routes.route("/login").post(limiter, Login, Login);

module.exports = Routes;
