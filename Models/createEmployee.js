const mongoose = require("mongoose");

const createEmployee = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Required employee name"],
    },
    slug: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Required email employee"],
      unique: [true, "unique email employee"],
    },
    password: {
      type: String,
      required: [true, "Required password employee"],
    },
    grander: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Required Grander employee"],
    },
    identity: {
      type: Number,
      required: [true, "Required identity employee"],
      unique: [true, "unique identity employee"],
    },
    employeeNumber: {
      type: Number,
      required: [true, "Required employeeNumber"],
      unique: [true, "unique employeeNumber"],
    },
    phone: {
      type: String,
      required: [true, "Required phone Number employee"],
      unique: [true, "unique phone Number employee"],
    },
    address: {
      area: String,
      city: String,
      street: String,
      build: String,
    },
    continued: {
      type: String,
      enum: ["building", "location", "assets"],
    },
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "continued",
    },

    role: {
      type: String,
      enum: [
        "owner", // مالك المنصه
        "manager", //مدير المنصه
        "facilitys_manager", //مدير المنشأت
        "safety_manager", //مدير السلامه
        "security_manager", //مدين الامن
        "contracts_manager", //مدير العقود
        "safety_officer", //مسؤول السلامه
        "security_manager", //مسؤول الامن
        "facility_manager",
        "health_manager", //مدير المركز الصحي
        "Security Guard", //حارس الامن
      ],
      required: [true, "Required role employee"],
    },
  },
  { timestamps: true }
);

const createEmployeeModel = mongoose.model("employee", createEmployee);
module.exports = createEmployeeModel;
