const { Router } = require("express");
const { allowedTo } = require("../Services/AuthService");
const { getStatistics } = require("../Services/Statistics");

const Routes = Router();

Routes.route("/").get(allowedTo("owner"), getStatistics);

module.exports = Routes;
