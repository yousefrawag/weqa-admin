const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createEmployeeModel = require("../Modules/createEmployee");

exports.createEmployee = expressAsyncHandler(async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 12);
  const E = await createEmployeeModel.create(req.body);

  await E.save();
  res.status(200).json({
    status: "success",
    data: E,
  });
});

exports.getEmployee = factory.getAll(createEmployeeModel);
exports.getE = (model) => factory.getOne(model);
exports.deleteE = factory.deleteOne(createEmployeeModel, "admin");
exports.updateE = factory.updateOne(createEmployeeModel, "admin");
