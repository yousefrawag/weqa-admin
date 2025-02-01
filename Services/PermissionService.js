const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const bcrypt = require("bcryptjs");
const createPermissionModel = require("../Models/createPermission");
const createEmployeeModel = require("../Models/createEmployee");
const createFirstOwnerAccount = async (permission) => {
  const existingManager = await createEmployeeModel.findOne({
    email: "owner@gmail.com",
  });
  if (existingManager) {
    console.log("owner account already exists");
    return;
  }

  await createEmployeeModel.create({
    username: "owner",
    email: "owner@gmail.com",
    phone: "01000000000",
    role: "owner",
    grander: "male",
    identity: 123456789,
    employeeNumber: 1997,
    address: {
      area: "North-Sina",
      city: "El-Arish",
      area: "",
      street: "125 atef Street",
      build: "16",
    },
    permissions: permission,
    password: await bcrypt.hash("123456789", 12),
    confirmPassword: await bcrypt.hash("123456789", 12),
  });

  console.log("Manager account created successfully");
};
exports.createPermissions = async () => {
  const roles = { ar: "مالك المنصه", en: "owner" };

  try {
    const existingRole = await createPermissionModel
      .findOne({
        "roles.ar": roles.ar, 
        "roles.en": roles.en,
      })
      .then(async (e) => {
        await createFirstOwnerAccount(e._id);
      });

    if (!existingRole) {
      await createPermissionModel.create({
        roles: roles, // استبدال `role` بـ `roles`
      });
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
