const mongoose = require("mongoose");

const createDepartment = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Category"],
    },
    ministry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ministry",
      required: true,
    },
    department: [{ type: mongoose.Schema.Types.ObjectId, ref: "department" }],
  },
  { timestamps: true }
);

const createDepartmentModel = mongoose.model("department", createDepartment);
module.exports = createDepartmentModel;
