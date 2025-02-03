const mongoose = require("mongoose");

const permissionSubSchema = new mongoose.Schema({
  actions: {
    type: [String],
    enum: ["get", "post", "put", "delete"],
  },
  allowedIds: [mongoose.Schema.Types.ObjectId],
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
    roles: {
      ar: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
    },
    mainCategory: permissionSubSchemaWithoutAllowed,
    employee: permissionSubSchemaWithoutAllowed,
    assets: permissionAssetsSchema,
    mainCategoryAssets: permissionSubSchema,
    building: {
      type: mongoose.Schema.Types.Mixed,
      default: "all",
    },
  },
  { timestamps: true }
);

const createPermissionModel = mongoose.model("Permission", permissionSchema);
module.exports = createPermissionModel;
