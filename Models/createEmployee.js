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
      unique: [true, "unique phone Number employee"],
    },
    address: {
      area: String,
      city: String,
      street: String,
      build: String,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        required: [true, "Required permission"],
      },
    ],
  },
  { timestamps: true }
);
createEmployee.pre(/^find/, function (next) {
  this.populate({
    path: "permissions",
    select: "roles"
  });

  next();
});

const createEmployeeModel = mongoose.model("employee", createEmployee);
module.exports = createEmployeeModel;
