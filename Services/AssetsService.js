const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createAssetsnModel = require("../Models/createAssets");
const createSubCategoryAssetsModel = require("../Models/createSubCategoryAssets");
const createCategoryAssetsModel = require("../Models/createCategoryAssets");
const createMainCategoryAssetsModel = require("../Models/createMainCategoryAssets");
const ApiError = require("../Resuble/ApiErrors");
exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  if (req.file) {
    req.body.pdf = req.file.filename;
  }

  next();
});
exports.createAssets = expressAsyncHandler(async (req, res) => {
  const { subCategoryAssets, continued } = req.body;

  const assetsModel = new createAssetsnModel(req.body);

  try {
    let category;

    // معالجة الـ category بناءً على قيمة "continued"
    if (continued === "first") {
      category = await createMainCategoryAssetsModel.findByIdAndUpdate(
        subCategoryAssets,
        {
          $push: { assets: assetsModel._id },
        },
        { new: true }
      );
      if (!category) {
        return res
          .status(404)
          .json({ status: "Error", msg: "Main Category asset not found" });
      }
    } else if (continued === "second") {
      const subcategory = await createCategoryAssetsModel.findByIdAndUpdate(
        subCategoryAssets,
        {
          $push: { assets: assetsModel._id },
        },
        { new: true }
      );
      if (!subcategory) {
        return res
          .status(404)
          .json({ status: "Error", msg: "Category asset not found" });
      }
    } else if (continued === "third") {
      const main = await createSubCategoryAssetsModel.findByIdAndUpdate(
        subCategoryAssets,
        {
          $push: { assets: assetsModel._id },
        },
        { new: true }
      );
      if (!main) {
        return res
          .status(404)
          .json({ status: "Error", msg: "Main category asset not found" });
      }
    } else {
      return res
        .status(400)
        .json({ status: "Error", msg: "Invalid 'continued' value" });
    }

    // حفظ النموذج بعد تحديث الـ category
    await assetsModel.save();

    // إضافة populate هنا بعد حفظ البيانات
    let populatedAssets = await assetsModel.populate({
      path: "location",
      select: "name kind building", // تضمين الحقول المطلوبة فقط
      populate: {
        path: "building",
        select: "name kind", // تضمين الحقول الخاصة بالبناء فقط
      },
      options: {
        lean: true, // استخدام lean لتحسين الأداء
      },
    });

    // حذف الحقول غير المطلوبة من populatedAssets
    if (populatedAssets.location) {
      populatedAssets.location = populatedAssets.location.map((location) => {
        // حذف الحقول غير المطلوبة داخل الـ location
        delete location.floors;
        return location;
      });
    }

    // إرجاع النتيجة بعد التعديل
    res.status(201).json({ status: "Success", data: populatedAssets });
  } catch (error) {
    res.status(400).json({ status: "Error", msg: error.message });
  }
});

exports.getAssetss = expressAsyncHandler(async (req, res, next) => {
  let getDocById = await createAssetsnModel
    .find()
    .select("-floor -area -room -subCategoryAssets") // استبعاد الحقول في الاستعلام الرئيسي
    .populate({
      path: "location",
      select: "name kind building", // تضمين الحقول المطلوبة فقط
      populate: {
        path: "building",
        select: "name kind", // تضمين الحقول الخاصة بالبناء فقط
      },
      // استبعاد الـ floors بشكل صريح
      options: {
        lean: true, // يمكن استخدام lean لتحسين الأداء في حالة عدم الحاجة إلى الخصائص الإضافية للـ Mongoose Documents
      },
    })
    .exec();

  if (!getDocById) {
    return next(
      new ApiError(`Sorry, can't get this ID from ID: ${req.params.id}`, 404)
    );
  }
  getDocById = getDocById.map((doc) => {
    if (doc.location) {
      doc.location = doc.location.map((location) => {
        // حذف floors من كل location
        delete location.floors;
        return location;
      });
    }
    return doc;
  });
  res.status(200).json({ data: getDocById });
});
exports.getAssets = expressAsyncHandler(async (req, res, next) => {
  const { floorId, areaId, roomId } = req.query;

  let getDocById = await createAssetsnModel.findById(req.params.id).populate({
    path: "location",
    populate: {
      path: "floors",
      match: { _id: floorId },
      populate: {
        path: "areas",
        match: { _id: areaId },
        populate: {
          path: "sections",
          populate: {
            path: "rooms",
            match: { _id: roomId },
            select: "name",
          },
        },
      },
    },
  });

  if (!getDocById) {
    return next(
      new ApiError(`Sorry, can't get this ID from ID: ${req.params.id}`, 404)
    );
  }

  // فلترة البيانات بحيث لا يتم إرجاع الـ floors بعد تصفيتها
  getDocById.location.forEach((location) => {
    if (location.floors) {
      location.floors = location.floors.filter(
        (floor) => floor._id.toString() === floorId.toString()
      );
      location.floors.forEach((floor) => {
        if (floor.areas) {
          floor.areas = floor.areas.filter(
            (area) => area._id.toString() === areaId.toString()
          );
          floor.areas.forEach((area) => {
            if (area.sections) {
              area.sections.forEach((section) => {
                // تصفية الغرف داخل القسم حسب roomId
                section.rooms = section.rooms.filter(
                  (room) => room._id.toString() === roomId.toString()
                );
              });
            }
          });
        }
      });
    }
  });

  res.status(200).json({ data: getDocById });
});

exports.getAssetsByCategory = expressAsyncHandler(async (req, res, next) => {
  const { assetsId } = req.params;
  let assets = await createAssetsnModel
    .find({
      subCategoryAssets: { $in: assetsId },
    })
    .select("-floor -area -room -subCategoryAssets")
    .populate({
      path: "location",
      select: "name kind building",
      populate: {
        path: "building",
        select: "name kind",
      },
      options: {
        lean: true,
      },
    })
    .exec();

  assets = assets.map((doc) => {
    if (doc.location) {
      doc.location = doc.location.map((location) => {
        delete location.floors;
        return location;
      });
    }
    return doc;
  });

  // التحقق من أن النتائج موجودة
  if (!assets || assets.length === 0) {
    return res.status(401).json({ msg: "Assets not found" });
  }

  // إرجاع النتيجة بنجاح
  res.status(200).json({ data: assets });
});

exports.updateAssets = factory.updateOne(createAssetsnModel);
exports.deleteAssets = factory.deleteOne(createAssetsnModel);
