const mongoose = require("mongoose");

const createDepartment = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Category"],
    },

    department: [{ type: mongoose.Schema.Types.ObjectId, ref: "department" }],
  },
  { timestamps: true }
);

const createDepartmentModel = mongoose.model("ministry", createDepartment);
module.exports = createDepartmentModel;
