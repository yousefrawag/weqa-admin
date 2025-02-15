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
    image: {
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
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "building",
      required: function () {
        return this.role === "user";
      },
    },

    permissions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
      required: function () {
        return this.role === "user";
      },
    },
    role: {
      type: String,
      enum: ["owner", "manager", "employee", "user"],

      default: "user",
    },
    type: {
      type: String,
      enum: ["manager", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);
createEmployee.pre(/^find/, function (next) {
  this.populate({
    path: "permissions",
  });

  next();
});
const ImageURL = (doc) => {
  if (doc.image && !doc.image.includes(`${process.env.BASE_URL}/user`)) {
    const image = `${process.env.BASE_URL}/user/${doc.image}`;
    doc.image = image;
  }
};
createEmployee.post("init", (doc) => {
  ImageURL(doc);
});
createEmployee.post("save", (doc) => {
  ImageURL(doc);
});
const createEmployeeModel = mongoose.model("employee", createEmployee);
module.exports = createEmployeeModel;
