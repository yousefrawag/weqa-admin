const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createEmployeeModel = require("../Modules/createEmployee");

exports.createEmployee = expressAsyncHandler(async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 12);
  const Employee = await createEmployeeModel.create(req.body);

  await Employee.save();
  res.status(200).json({
    status: "success",
    data: Employee,
  });
});

exports.getEmployee = factory.getAll(createEmployeeModel);
exports.getEmployee = (model) => factory.getOne(model);
exports.deleteEmployee = factory.deleteOne(createEmployeeModel, "admin");
exports.updateEmployee = factory.updateOne(createEmployeeModel, "admin");
