const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
    building: {
      actions: {
        type: [String],
        enum: ["get", "post", "put", "delete"],
        required: true,
      },
      allowedIds: [mongoose.Schema.Types.ObjectId],
    },
    assets: {
      actions: {
        type: [String],
        enum: ["get", "post", "put", "delete"],
        required: true,
      },
      allowedIds: [mongoose.Schema.Types.ObjectId],
    },
    location: {
      actions: {
        type: [String],
        enum: ["get", "post", "put", "delete"],
        required: true,
      },
      allowedIds: [mongoose.Schema.Types.ObjectId],
    },
    maincategories: {
      actions: {
        type: [String],
        enum: ["get", "post", "put", "delete"], // Actions المسموح بها
        required: true,
      },
      allowedIds: [mongoose.Schema.Types.ObjectId],
    },
  },
  { timestamps: true }
);

const createPermissionModel = mongoose.model("Permission", permissionSchema);
module.exports = createPermissionModel;
