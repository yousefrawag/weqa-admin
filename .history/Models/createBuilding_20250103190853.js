const mongoose = require("mongoose");
const createBuilding = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Building"],
    },
    slug: {
      type: String,
    },
    kind: {
      type: String,
      required: [true, "Required Kind Building"],
    },

    levels: {
      type: mongoose.Schema.Types.ObjectId,
    },
    continued: {
      type: String,
      enum: [
        "first", //مالك المنصة
        "second", //مدير المنصة
        "third", //مدير المنشأة
        "fourth", //مدير السلامة
        "fifth", //مدير الامن
        "contracts_manager", // مدير العقود والمشتريات
        "safety_officer", //مسؤول السلامة
        "security_manager", //مسؤول الأمن
        "supervisor", //مشرف القطاع للمراكز الصحية …
        "health_manager", //مدير المركز الصحي ..
        "Security Guard", //حارس الأمن ..
      ],
  },
  { timestamps: true }
);

const createBuildingModel = mongoose.model("building", createBuilding);
module.exports = createBuildingModel;
