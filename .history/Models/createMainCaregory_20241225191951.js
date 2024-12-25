const mongoose = require("mongoose");

const createMinistry  = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Category"],
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
      default: "user",
    },
  },
  { timestamps: true }
);

const createMinistryMode = mongoose.model("mainCategory", createMinistry);
module.exports = createMinistry;
