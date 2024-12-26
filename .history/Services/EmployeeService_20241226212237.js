const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createEmployeeModel = require("../Modules/createEmployee");


exports.createEmployee = expressAsyncHandler(async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 12);
  const user = await createEmployeeModel.create(req.body);

  await user.save();
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.getEmployee = factory.getAll(createEmployeeModel);
exports.getUser = (model) => factory.getOne(model);
exports.deleteUser = factory.deleteOne(createEmployeeModel, "admin");
exports.updateUser = factory.updateOne(createEmployeeModel, "admin");
