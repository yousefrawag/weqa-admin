const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createEmployeeModel = require("../Modules/createEmployee");

exports.createEmployee = expressAsyncHandler(async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 12);
  const EgetEmployee = await createEmployeeModel.create(req.body);

  await EgetEmployee.save();
  res.status(200).json({
    status: "success",
    data: EgetEmployee,
  });
});

exports.getEmployee = factory.getAll(createEmployeeModel);
exports.getEmployee = (model) => factory.getOne(model);
exports.deleteEgetEmployee = factory.deleteOne(createEmployeeModel, "admin");
exports.updateEgetEmployee = factory.updateOne(createEmployeeModel, "admin");
