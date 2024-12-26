const mongoose = require("mongoose");

const createEmployee = new mongoose.Schema(
  {
    Empolyeename: {
      type: String,
      required: [true, "Required Empolyee name Empolyee"],
    },
    email: {
      type: String,
      required: [true, "Required email Empolyee"],
    },
    password: {
      type: String,
      required: [true, "Required password Empolyee"],
    },
    grander: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Required Grander Empolyee"],
    },
    identity: {
      type: Number,
      required: [true, "Required identity Empolyee"],
    },
    employeeNumber: {
      type: Number,
      required: [true, "Required employeeNumber Empolyee"],
    },
    phone: {
      type: String,
      required: [true, "Required phone Number Empolyee"],
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
      required: [true, "Required role Empolyee"],
    },
  },
  { timestamps: true }
);

const createEmployeeModel = mongoose.model("employee", createEmployee);
module.exports = createEmployeeModel;
