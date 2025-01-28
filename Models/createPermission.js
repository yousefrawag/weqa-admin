const mongoose = require("mongoose");

const permissionSubSchema = new mongoose.Schema({
  actions: {
    type: [String],
    enum: ["get", "post", "put", "delete"],
  },
  allowedIds: [mongoose.Schema.Types.ObjectId],
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
    mainCategory: permissionSubSchema,
    category: permissionSubSchema,
    subCategory: permissionSubSchema,
    nestSubCategory: permissionSubSchema,
    subNestSubCategory: permissionSubSchema,
    mainCategoryAssets: permissionSubSchema,
    categoryAssets: permissionSubSchema,
    subCategoryAssets: permissionSubSchema,
    assets: permissionSubSchema,
    building: permissionSubSchema,
    location: permissionSubSchema,
  },
  { timestamps: true }
);

const createPermissionModel = mongoose.model("Permission", permissionSchema);
module.exports = createPermissionModel;
