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
      unique: [true, "unique identity employee"],
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
      required: [true, "Required role employee"],
    },
  },
  { timestamps: true }
);

const createEmployeeModel = mongoose.model("employee", createEmployee);
module.exports = createEmployeeModel;
