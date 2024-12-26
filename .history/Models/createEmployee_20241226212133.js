const mongoose = require("mongoose");

const createEmployee = new mongoose.Schema(
  {
    employeeeename: {
      type: String,
      required: [true, "Required employeeee name"],
    },
    email: {
      type: String,
      required: [true, "Required email employeeee"],
    },
    password: {
      type: String,
      required: [true, "Required password employeeee"],
    },
    grander: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Required Grander employeeee"],
    },
    identity: {
      type: Number,
      required: [true, "Required identity employeeee"],
    },
    employeeNumber: {
      type: Number,
      required: [true, "Required employeeNumber employeeee"],
    },
    phone: {
      type: String,
      required: [true, "Required phone Number employeeee"],
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
      required: [true, "Required role employeeee"],
    },
  },
  { timestamps: true }
);

const createEmployeeModel = mongoose.model("employee", createEmployee);
module.exports = createEmployeeModel;
