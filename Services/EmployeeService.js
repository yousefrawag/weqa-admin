const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createEmployeeModel = require("../Models/createEmployee");
const { UploadSingleImage } = require("../Middlewares/UploadImageMiddleware");
exports.uploadImage = UploadSingleImage("image");
exports.fsRemove = async (filePath) => {
  if (!filePath) return;
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(" Faild Delete:", err);
    } else {
      console.log("Delete Is Success in local filesystem");
    }
  });
};
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
exports.getEmployee = factory.getOne(createEmployeeModel);
exports.deleteEmployee = factory.deleteOne(createEmployeeModel);
exports.updateEmployee = factory.updateOne(createEmployeeModel);
