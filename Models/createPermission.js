const mongoose = require("mongoose");

const permissionSubSchema = new mongoose.Schema({
  actions: {
    type: [String],
    enum: ["get", "post", "put", "delete"],
  },
  allowedIds: [{ type: mongoose.Schema.Types.Mixed, default: "all" }],
});
const permissionAssetsSchema = new mongoose.Schema({
  actions: {
    type: [String],
    enum: ["get", "post", "put", "delete"],
  },
  financial: {
    financial: {
      type: Boolean,
      default: false,
    },
    reports: {
      type: Boolean,
      default: false,
    },
  },
  allowedIds: [mongoose.Schema.Types.ObjectId],
});
const permissionSubSchemaWithoutAllowed = new mongoose.Schema({
  actions: {
    type: [String],
    enum: ["get", "post", "put", "delete"],
  },
});
const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "employee is required"],
    },
    mainCategory: permissionSubSchemaWithoutAllowed,
    location: permissionAssetsSchema,
    employee: permissionSubSchemaWithoutAllowed,
    assets: permissionAssetsSchema,
    mainCategoryAssets: permissionSubSchema,
    Support:permissionSubSchemaWithoutAllowed,
    building: {
      type: mongoose.Schema.Types.Mixed,
      default: "all",
    },
  },
  { timestamps: true }
);

const createPermissionModel = mongoose.model("Permission", permissionSchema);
module.exports = createPermissionModel;
