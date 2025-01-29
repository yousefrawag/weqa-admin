const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createPermissionModel = require("../Models/createPermission");
exports.createPermissions = async () => {
  const roles = { ar: "مالك المنصه", en: "owner" };

  try {
    const existingRole = await createPermissionModel.findOne({
      "roles.ar": roles.ar, // استبدال `role` بـ `roles`
      "roles.en": roles.en, // استبدال `role` بـ `roles`
    });

    if (!existingRole) {
      await createPermissionModel.create({
        roles: roles, // استبدال `role` بـ `roles`
      });
      console.log(`Role added: ${roles.ar} - ${roles.en}`);
    }

    console.log("Roles initialization complete.");
  } catch (error) {
    console.error("Error initializing roles:", error.message);
  }
};


exports.permission = expressAsyncHandler(async (req, res, next) => {
  const url = req.originalUrl;
  const resource = url.split("/")[3];
  const method = req.method.toLowerCase();

  const roles = ["owner", "manager"];

  if (roles.includes(req.user.role)) {
    return next();
  }

  try {
    const query = {
      employee: req.user._id,
      [`${resource}.actions`]: { $in: [method] },
      [`${resource}.allowedIds`]: { $in: [req.params.id] },
    };

    const permissions = await createPermissionModel.findOne(query);
    console.log(query);

    if (!permissions) {
      return res.status(403).json({ msg: "ليس لديك صلاحية" });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "خطأ في السيرفر", error: error.message });
  }
});
exports.permissionManager = expressAsyncHandler(async (req, res, next) => {
  const url = req.originalUrl;
  const resource = url.split("/")[3]; // استخراج المورد من الرابط
  const method = req.method.toLowerCase();

  const roles = [
    "facilitys_manager",
    "safety_manager",
    "security_manager",
    "contracts_manager",
  ];

  if (roles.includes(req.user.role)) {
    try {
      if (resource === "mainCategoryAssets") {
        await createMainCategoryAssetsModel.find().populate({
          path: "categoryAssets",
          populate: {
            path: "subCategoryAssets",
            populate: {
              path: "assets",
              select: "name description",
            },
          },
        });
        return next();
      } else if (resource === "categoryAssets") {
        await createMainCategoryAssetsModel
          .findOne({ "categoryAssets._id": req.params.id })
          .populate({
            path: "categoryAssets",
            populate: {
              path: "subCategoryAssets",
              populate: {
                path: "assets",
                select: "name description",
              },
            },
          });
        return next();
      } else if (resource === "subCategoryAssets") {
        await createMainCategoryAssetsModel
          .findOne({ "categoryAssets.subCategoryAssets._id": req.params.id })
          .populate({
            path: "categoryAssets",
            populate: {
              path: "subCategoryAssets",
              populate: {
                path: "assets",
                select: "name description",
              },
            },
          });
        return next();
      }

      // في حالة المورد غير معروف
      return res.status(400).json({ message: "Invalid resource type" });
    } catch (error) {
      return next(error);
    }
  }

  // إذا لم يكن للمستخدم صلاحية الوصول
  return res.status(403).json({ message: "Access denied" });
});
exports.createPermission = factory.createOne(createPermissionModel);
exports.getPermissions = factory.getAll(createPermissionModel);
exports.getPermission = factory.getOne(createPermissionModel);
exports.updatePermission = factory.updateOne(createPermissionModel);
exports.deletePermission = factory.deleteOne(createPermissionModel);
