const mongoose = require("mongoose");

const createUsers = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Required username User"],
    },
    email: {
      type: String,
      required: [true, "Required email User"],
    },
    password: {
      type: String,
      required: [true, "Required password User"],
    },
    grander: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    identity: {
      type: Number,
      required: [true, "Required identity User"],
    },
    employeeNumber: {
      type: Number,
      required: [true, "Required employeeNumber User"],
    },
    phone: {
      type: String,
      required: [true, "Required phone Number User"],
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
      required: [true, "Required phone Number User"],
    },
  },
  { timestamps: true }
);

const createUsersModel = mongoose.model("Users", createUsers);
module.exports = createUsersModel;
