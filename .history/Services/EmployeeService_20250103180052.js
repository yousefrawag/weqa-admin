const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createEmployeeModel = require("../Models/createEmployee");


exports.createEmployee = expressAsyncHandler(async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 12);
  const employee = await createEmployeeModel.create(req.body);

  await employee.save();
  res.status(200).json({
    status: "success",
    data: employee,
  });
});

exports.getEmployees = factory.getAll(createEmployeeModel);
exports.getEmployee = factory.getOne(model);
exports.deleteEmployee = factory.deleteOne(createEmployeeModel);
exports.updateEmployee = factory.updateOne(createEmployeeModel);
