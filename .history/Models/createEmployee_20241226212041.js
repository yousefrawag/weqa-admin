const mongoose = require("mongoose");

const createEmployee = new mongoose.Schema(
  {
    Emname: {
      type: String,
      required: [true, "Required Emname Em"],
    },
    email: {
      type: String,
      required: [true, "Required email Em"],
    },
    password: {
      type: String,
      required: [true, "Required password Em"],
    },
    grander: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Required Grander Em"],
    },
    identity: {
      type: Number,
      required: [true, "Required identity Em"],
    },
    employeeNumber: {
      type: Number,
      required: [true, "Required employeeNumber Em"],
    },
    phone: {
      type: String,
      required: [true, "Required phone Number Em"],
    },
    address: {
      area: String,
      city: String,
      area: String,
      street: String,
      build: String,
    },

    role: {
      type: String,
      enum: [
        "owner", //مالك المنصة
        "manager", //مدير المنصة
        "facility_manager", //مدير المنشأة
        "safety_manager", //مدير السلامة
        "security_manager", //مدير الامن
        "contracts_manager", // مدير العقود والمشتريات
        "safety_officer", //مسؤول السلامة
        "security_manager", //مسؤول الأمن
        "supervisor", //مشرف القطاع للمراكز الصحية …
        "health_manager", //مدير المركز الصحي ..
        "Security Guard", //حارس الأمن ..
      ],
      required: [true, "Required role Em"],
    },
  },
  { timestamps: true }
);

const createEmployeeModel = mongoose.model("employee", createEmployee);
module.exports = createEmployeeModel;
