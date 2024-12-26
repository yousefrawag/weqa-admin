const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../Resuble/ApiErrors");
const factory = require("./FactoryHandler");
const createUsersModel = require("../Modules/createUsers");
const { UploadSingleImage } = require("../Middleware/UploadImageMiddleware");
const fs = require("fs");
const createTeachersModel = require("../Modules/createTeacher");

exports.createUsers = expressAsyncHandler(async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 12);
  const user = await createUsersModel.create(req.body);

  await user.save();
  res.status(200).json({
    status: "success",
    // massage: "Rest Code Sent successfully",
    data: user,
  });
});

exports.getUsers = factory.getAll(createUsersModel);
exports.getUser = (model) => factory.getOne(model);
exports.deleteUser = factory.deleteOne(createUsersModel, "admin");
exports.updateUser = factory.updateOne(createUsersModel, "admin");

