const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createEmployeeModel = require("../Models/createEmployee");
const { UploadSingleImage } = require("../Middlewares/UploadImageMiddleware");
const createNotificationModel = require("../Models/createNotifacation");
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
exports.middelwareUpdate = expressAsyncHandler(async (req, res, next) => {
  if (
    req.user.role === "owner" ||
    (req.user.role === "employee" && !req.user.building)
  ) {
    return next();
  } else if (req.user.role === "user") {
    if (req.user.status === false) {
      const owners = await createEmployeeModel.find({
        $or: [{ role: "owner" }, { building: req.body.building }],
      });
      const notifications = owners.map((owner) => ({
        user: req.user.id,
        employee: owner._id,
        type: "request",
        text: "تم طلب تعديل بيانات ",
      }));
      await createNotificationModel.insertMany(notifications);
      return res
        .status(403)
        .json({ msg: "لايمكنك تعديل بياناتك قبل موافقة المسؤول" });
    }
  }
});
exports.getEmployees = factory.getAll(createEmployeeModel);
exports.getEmployee = factory.getOne(createEmployeeModel);
exports.deleteEmployee = factory.deleteOne(createEmployeeModel);
exports.updateEmployee = factory.updateOne(createEmployeeModel);
