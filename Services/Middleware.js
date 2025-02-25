const expressAsyncHandler = require("express-async-handler");
const createLocationModel = require("../Models/createLocation");
const createMainCategoryAssetsModel = require("../Models/createMainCategoryAssets");
const createCategoryAssetsModel = require("../Models/createCategoryAssets");

const permissionBuilding = async (resource, method, user, res, next) => {
  try {
    if (!user || !user.permissions || !user.permissions.building) {
      return res.status(403).json({ msg: "صلاحيات المستخدم غير متوفرة" });
    }

    if (resource === "building") {
      if (!user.permissions.building.actions.includes(method)) {
        return res.status(403).json({ msg: "ليس لديك صلاحية وصول إلى المبنى" });
      }
      next();
    } else if (resource === "location") {
      if (!user.permissions.location.actions.includes(method)) {
        return res.status(403).json({ msg: "ليس لديك صلاحية وصول إلى الموقع" });
      }
      if (
        method === "post" &&
        user.permissions.location.actions.includes(method)
      ) {
        return next();
      }
      const filter =
        user.role === "employee" ? {} : { building: user.building };

      const location = await createLocationModel.find(filter);

      if (!location) {
        return res.status(404).json({ msg: "الموقع غير موجود لهذا المبنى" });
      }

      return res.status(200).json({ data: location });
    } else if (resource === "tickets") {
      if (!user.permissions.Support.actions.includes(method)) {
        return res
          .status(403)
          .json({ msg: "ليس لديك صلاحية وصول إلى التذاكر" });
      }
      next();
    } else {
      return res.status(400).json({ msg: "المورد غير معروف" });
    }
  } catch (error) {
    console.error("خطأ في التحقق من الصلاحيات:", error);
    return res.status(500).json({ msg: "حدث خطأ داخلي في الخادم" });
  }
};

const permissionAssets = async (resource, method, user, res, next, req) => {
  if (resource === "mainCategoryAssets") {
    if (!user.permissions.mainCategoryAssets.actions.includes(method)) {
      return res
        .status(403)
        .json({ msg: "ليس لديك صلاحية وصول إلى  فئات الاصول" });
    }
    if (user.permissions.mainCategoryAssets.allowedIds) {
      const mainCategoryAssets = await createMainCategoryAssetsModel.find({
        _id: user.permissions.mainCategoryAssets.allowedIds,
      });

      return res.status(200).json({ data: mainCategoryAssets });
    } else {
      const mainCategoryAssets = await createMainCategoryAssetsModel.find();

      return res.status(200).json({ data: mainCategoryAssets });
    }
  } else if (resource === "categoryAssets") {
    if (!user.permissions.mainCategoryAssets.actions.includes(method)) {
      return res
        .status(403)
        .json({ msg: "ليس لديك صلاحية وصول إلى  فئات الاصول" });
    }
    const categoryMainAssets = await createMainCategoryAssetsModel.findOne({
      _id: user.permissions.mainCategoryAssets.allowedIds,
    });

    res.status(200).json({ data: categoryMainAssets.categoryAssets });
  } else if (resource === "subCategoryAssets") {
    if (!user.permissions.mainCategoryAssets.actions.includes(method)) {
      return res
        .status(403)
        .json({ msg: "ليس لديك صلاحية وصول إلى  فئات الاصول" });
    }

    const mainCategoryAssets = await createMainCategoryAssetsModel
      .findOne({
        _id: { $in: user.permissions.mainCategoryAssets.allowedIds },
      })
      .select("categoryAssets");
    const subCategoryAssets = mainCategoryAssets.categoryAssets.map(
      (category) => category.subCategoryAssets
    );

    return res.status(403).json({ data: subCategoryAssets });
  } else if (resource === "nestSubCategoryAssets") {
    if (!user.permissions.mainCategoryAssets.actions.includes(method)) {
      return res
        .status(403)
        .json({ msg: "ليس لديك صلاحية وصول إلى  فئات الاصول" });
    }

    const mainCategoryAssets = await createMainCategoryAssetsModel
      .findOne({
        _id: { $in: user.permissions.mainCategoryAssets.allowedIds },
      })
      .select("categoryAssets");
    const subCategoryAssets = mainCategoryAssets.categoryAssets.map(
      (category) => category.subCategoryAssets
    );

    return res.status(403).json({ data: subCategoryAssets });
  } else if (resource === "assets") {
    if (!user.permissions.assets.actions.includes(method)) {
      return res.status(403).json({ msg: "ليس لديك صلاحية وصول إلى الأصول" });
    }

    if (req.user.role === "employee") {
      req.query = {
        subCategoryAssets: {
          $in: user.permissions.mainCategoryAssets?.allowedIds || [],
        },
      };
    } else if (req.user.role === "user") {
      req.query = {
        $and: [
          {
            subCategoryAssets: {
              $in: user.permissions.mainCategoryAssets?.allowedIds || [],
            },
          },
          { building: { $in: user.building || [] } },
        ],
      };
    }
  } else if (resource === "employee") {
    if (!user.permissions.employee.actions.includes(method)) {
      return res
        .status(403)
        .json({ msg: "ليس لديك صلاحية وصول إلى المستخدمين" });
    }
  }
  next();
};
const permissionCategory = async (method, req, res, next) => {
  try {
    if (!req.user || !req.user.permissions || !req.user.permissions.building) {
      return res.status(403).json({ msg: "صلاحيات المستخدم غير متوفرة" });
    }

    if (!req.user.permissions.mainCategory.actions.includes(method)) {
      return res
        .status(403)
        .json({ msg: "ليس لديك صلاحية وصول إلى الهيكل الاداري" });
    }
    return next();
  } catch (error) {
    return res.status(500).json({ msg: "حدث خطأ داخلي في الخادم" });
  }
};
exports.getPermissions = expressAsyncHandler((req, res, next) => {
  const url = req.originalUrl;
  const resource = url.split("/")[3];
  const method = req.method.toLowerCase();
  if (req.user.role === "owner") {
    return next();
  } else if (
    req.user.role === "user" ||
    req.user.role === "manager" ||
    req.user.role === "employee"
  ) {
    if (
      resource === "building" ||
      resource === "location" ||
      resource === "tickets"
    ) {
      permissionBuilding(resource, method, req.user, res, next);
    } else if (
      resource === "assets" ||
      resource === "mainCategoryAssets" ||
      resource === "categoryAssets" ||
      resource === "subCategoryAssets" ||
      resource === "nestSubCategoryAssets" ||
      resource === "employee"
    ) {
      permissionAssets(resource, method, req.user, res, next, req);
    } else if (
      resource === "mainCategory" ||
      resource === "category" ||
      resource === "subCategory" ||
      resource === "nestSubCategory" ||
      resource === "subNestSubCategory"
    ) {
      permissionCategory(method, req, res, next);
    }
  }
});
const permissionMiddlewareBuilding = async (
  resource,
  method,
  req,
  res,
  next
) => {
  try {
    if (!req.user || !req.user.permissions || !req.user.permissions.building) {
      return res.status(403).json({ msg: "صلاحيات المستخدم غير متوفرة" });
    }

    if (resource === "building") {
      if (
        !req.user.permissions.building.actions.includes(method) ||
        req.params.id !== req.user.building.toString()
      ) {
        return res.status(403).json({ msg: "ليس لديك صلاحية وصول إلى المبنى" });
      }
      return next();
    } else if (resource === "location") {
      if (!req.user.permissions.location.actions.includes(method)) {
        return res
          .status(403)
          .json({ msg: "ليس لديك صلاحية لتنفيذ هذا الإجراء" });
      }

      const location = await createLocationModel.findOne({
        building: req.user.building,
      });

      if (!location) {
        return res.status(404).json({ msg: "لم يتم العثور على الموقع" });
      }

      if (location._id.toString() !== req.params.id) {
        return res.status(403).json({ msg: "ليس لديك صلاحية وصول إلى الموقع" });
      }

      return next();
    } else {
      return res.status(400).json({ msg: "المورد غير معروف" });
    }
  } catch (error) {
    console.error("خطأ في التحقق من الصلاحيات:", error);
    return res.status(500).json({ msg: "حدث خطأ داخلي في الخادم" });
  }
};

const permissionMiddlewareAssets = async (resource, method, req, res, next) => {
  if (resource === "mainCategoryAssets") {
    if (
      !req.user.permissions.mainCategoryAssets.actions.includes(method) ||
      !req.user.permissions.mainCategoryAssets.allowedIds.includes(
        req.params.id
      )
    ) {
      return res
        .status(403)
        .json({ msg: "ليس لديك صلاحية وصول إلى  فئات الاصول" });
    }
    return next();
  } else if (resource === "categoryAssets") {
    if (req.user.permissions.mainCategoryAssets.actions.includes(method)) {
      const categoryMainAssets = await createMainCategoryAssetsModel.findOne({
        categoryAssets: { $in: [req.params.id] },
      });
      if (!categoryMainAssets) {
        return res
          .status(403)
          .json({ msg: "ليس لديك صلاحية وصول إلى  فئات الاصول" });
      } else {
        return next();
      }
    } else {
      return res
        .status(403)
        .json({ msg: "ليس لديك صلاحية وصول إلى  فئات الاصول" });
    }
  } else if (resource === "subCategoryAssets") {
    if (req.user.permissions.mainCategoryAssets.actions.includes(method)) {
      const categoryAssets = await createCategoryAssetsModel.findOne({
        subCategoryAssets: { $in: [req.params.id] },
      });

      if (!categoryAssets) {
        return res
          .status(403)
          .json({ msg: "ليس لديك صلاحية وصول إلى  فئات الأصول" });
      }
      return next();
    } else {
      return res
        .status(403)
        .json({ msg: "ليس لديك صلاحية وصول إلى  فئات الأصول" });
    }
  } else if (resource === "assets") {
    if (req.user.permissions.assets.actions.includes(method)) {
      // const mainCategoryAssets = await createMainCategoryAssetsModel.findOne({
      //   assets: { $in: [req.params.id] },
      // });
      // const subCategoryAssets = await createSubCategoryAssetsModel.findOne({
      //   assets: { $in: [req.params.id] },
      // });

      // if (!mainCategoryAssets && !subCategoryAssets) {
      //   return res
      //     .status(403)
      //     .json({ msg: "ليس لديك صلاحية وصول إلى  فئات الأصول" });
      // }
      return next();
    } else {
      return res
        .status(403)
        .json({ msg: "ليس لديك صلاحية وصول إلى  فئات الأصول" });
    }
  } else if (resource === "employee") {
    if (!user.permissions.assets.actions.includes(method)) {
      return res
        .status(403)
        .json({ msg: "ليس لديك صلاحية وصول إلى المستخدمين" });
    }
  }
};
exports.permissionMiddleware = expressAsyncHandler((req, res, next) => {
  const url = req.originalUrl;
  const resource = url.split("/")[3];
  const method = req.method.toLowerCase();
  if (
    req.user.role === "owner" ||
    (req.user.role === "employee" && !req.user.building)
  ) {
    return next();
  } else if (req.user.role === "user" || req.user.role === "manager") {
    if (resource === "building" || resource === "location") {
      permissionMiddlewareBuilding(resource, method, req, res, next);
    } else if (
      resource === "assets" ||
      resource === "mainCategoryAssets" ||
      resource === "categoryAssets" ||
      resource === "subCategoryAssets"
    ) {
      permissionMiddlewareAssets(resource, method, req, res, next);
    }
  }
});
