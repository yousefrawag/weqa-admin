const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { LoginValidator } = require("../Resuble/AuthvalidatorError");
const {
  SingUp,
  Login,
  forgetPassword,
  restNewPassword,
  verifyEmail,
} = require("../Service/AuthService");
require("../Config/googleAuth");

const { limiter } = require("../Service/FactoryHandler");
const Routes = Router();

// مسار تسجيل الدخول
Routes.route("/login").post(limiter, LoginValidator, Login);

// مسار نسيان كلمة المرور
Routes.post("/forgetPassword", limiter, forgetPassword);

// مسار التحقق من البريد الإلكتروني
Routes.get("/verify", verifyEmail);

// مسار إعادة تعيين كلمة المرور
Routes.put("/setNewPassword", restNewPassword("password"));

module.exports = Routes;
