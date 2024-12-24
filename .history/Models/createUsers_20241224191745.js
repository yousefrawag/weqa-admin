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
      required: [true, "Required lastName User"],
    },
    phone: {
      type: String,
      // required: [true, "Required lastName User"],
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
      enum: ["user", "admin", "manager"],
      default: "user",
    },
  },
  { timestamps: true }
);

const createUsersModel = mongoose.model("Users", createUsers);
module.exports = createUsersModel;
