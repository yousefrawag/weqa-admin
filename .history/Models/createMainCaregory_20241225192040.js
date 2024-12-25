const mongoose = require("mongoose");

const createMinistry = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Category"],
    },

    regions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Region" }],
  },
  { timestamps: true }
);

const createMinistryModel = mongoose.model("ministry", createMinistry);
module.exports = createMinistryModel;
