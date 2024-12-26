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

exports.updateLoggedUserPassword = (model) =>
  expressAsyncHandler(async (req, res) => {
    const user = await model.findByIdAndUpdate(
      req.user._id,
      {
        password: await bcrypt.hash(req.body.password, 12),
      },
      {
        new: true,
      }
    );
    const token = jwt.sign({ userId: user._id }, process.env.DB_URL, {
      expiresIn: "90d",
    });
    res.status(200).json({ data: user, token });
  });
exports.updateUser = factory.updateOne(createUsersModel, "admin");
exports.paidToTeacher = expressAsyncHandler(async (req, res, next) => {
  const teacher = await createTeachersModel.findById(req.params.id);
  if (!teacher) {
    return next(new ApiError("Teacher Not Found"));
  }
  teacher.paid.push(req.body);
  await teacher.save(); // Save the updated teacher document to the database

  res.status(200).json({
    status: "success",
    data: teacher,
  });
});
