const expressAsyncHandler = require("express-async-handler");
const createAssetsnModel = require("../Models/createAssets");
const createSubCategoryAssetsModel = require("../Models/createSubCategoryAssets");
const createCategoryAssetsModel = require("../Models/createCategoryAssets");
const createMainCategoryAssetsModel = require("../Models/createMainCategoryAssets");
const ApiError = require("../Resuble/ApiErrors");
const fs = require("fs");
const createLocationModel = require("../Models/createLocation");
const path = require("path");
const createNotificationModel = require("../Models/createNotifacation");
const createEmployeeModel = require("../Models/createEmployee");
const createnestSubCategoryAssetsModel = require("../Models/createnestSubCategoryAssets");
const createPermissionModel = require("../Models/createPermission");

exports.resizepdf = (type) =>
  expressAsyncHandler(async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
      return next();
    }
    
    req.body.createBy = req.user._id;
    req.body.pdf = [];
    if (req.files.length > 0) {
      req.files.pdf.forEach((file) => {
        req.body.pdf.push({
          pdf: file.filename,
        
        });
      });
    }

    next();
  });
exports.buildingMiddleware = expressAsyncHandler(async (req, res, next) => {
  if (req.user.role === "owner" || !req.user.building) {
    return next();
  } else if (req.body.building.toString() !== req.user.building.toString()) {
    return res.status(404).json({ msg: "لا يمكنك انشاء اصل لهذه المنشأه" });
  }
  next();
});
exports.createAssets = expressAsyncHandler(async (req, res) => {
  const { subCategoryAssets, continued } = req.body;
  const building = await createLocationModel.findById(req.body.location);
  console.log(req.files.pdf)
  let pdfFiles = req.files.pdf.map((file) => ({
  
    pdf: file.filename,
    createdBy: {
      identity: req.user.identity,
      username: req.user.username,
      image:req.user.image
    },
    fileName:file.name,
    createdAt: new Date(),
  }));

  req.body.pdf = [...(req.body.pdf || []), ...pdfFiles];

  req.body.building = building.building._id;
  const levelsModel =
    continued === "first"
      ? "maincategoryassets"
      : continued === "second"
      ? "categoryassets"
      : continued === "third"
      ? "subcategoryassets"
      : "nestsubcategoryassets";
  req.body.levelsModel = levelsModel;
  const assetsModel = new createAssetsnModel(req.body);

  try {
    let category;

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
          .json({ status: "Error", msg: " subCategory asset not found" });
      }
    } else if (continued === "fourth") {
      const main = await createnestSubCategoryAssetsModel.findByIdAndUpdate(
        subCategoryAssets,
        {
          $push: { assets: assetsModel._id },
        },
        { new: true }
      );
      if (!main) {
        return res
          .status(404)
          .json({ status: "Error", msg: " nestSubCategory asset not found" });
      }
    } else {
      return res
        .status(400)
        .json({ status: "Error", msg: "Invalid 'continued' value" });
    }

    await assetsModel.save();
    let populatedAssets = await assetsModel.populate({
      path: "location",
      select: "name kind building",
      populate: {
        path: "building",
        select: "name kind",
      },
      options: {
        lean: true,
      },
    });

    if (populatedAssets.location) {
      populatedAssets.location = populatedAssets.location.map((location) => {
        delete location.floors;
        return location;
      });
    }

    const owners = await createEmployeeModel.find({
      $or: [{ role: "owner" }, { building: req.body.building }],
    });
    const notifications = owners.map((owner) => ({
      user: req.user.id,
      employee: owner._id,
      levels: "assets",
      allowed: assetsModel._id,
      type: "request",
      text: "تم إضافة اصل جديد",
    }));
    await createNotificationModel.insertMany(notifications);
    res.status(201).json({ status: "Success", data: populatedAssets });
  } catch (error) {
    res.status(400).json({ status: "Error", msg: error.message });
  }
});

exports.getAssetss = expressAsyncHandler(async (req, res, next) => {
  try {
    const queryFilter = { ...req.query };
    let filter =
      req.user.role === "user" || req.user.role === "employee"
        ? queryFilter
        : req.user.role === "manager" && req.user.building
        ? { building: req.user.building }
        : {};

    const {
      limit = 10,
      page = 1,
      sort = "-createdAt",
      fields = "",
    } = req.query;

    const skip = (page - 1) * limit;
    const getDocById = await createAssetsnModel
      .find(filter)
      .sort(sort)
      .select(fields)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "building",
        select: "name",
      })

      .populate({
        path: "subCategoryAssets",
        select: { assets: 0 },
      })
      .populate({
        path: "location",
        select: "name floors",
        populate: {
          path: "floors",
          select: "floorName areas",
          populate: {
            path: "areas",
            select: "name sections",
            populate: {
              path: "sections",
              select: "name rooms",
              populate: {
                path: "rooms",
                select: "name assets",
              },
            },
          },
        },
      })
      .populate({
        path: "createBy",
        select: "username identity",
      })
      .lean()
      .exec();
    if (!getDocById || getDocById.length === 0) {
      return next(new ApiError(`Sorry, no data found`, 404));
    }
    const filteredData = getDocById.filter((doc) => {
      if (filter["location.build._id"]) {
        return doc.location.some(
          (loc) =>
            loc.build &&
            loc.build._id.toString() === filter["location.build._id"].toString()
        );
      }
      return true;
    });

    const enrichedData = filteredData.map((doc) => {
      if (doc.pdf && Array.isArray(doc.pdf)) {
        doc.pdf = doc.pdf.map((pdfItem) => {
          if (
            typeof pdfItem.pdf === "string" &&
            !pdfItem.pdf.includes(`${process.env.BASE_URL}/assets`)
          ) {
            return {
              ...pdfItem,
              pdf: `${process.env.BASE_URL}/assets/${pdfItem.pdf}`,
            };
          }
          return pdfItem;
        });
      }

      const locationDetails = doc.location.map((loc) => {
        const floor = loc.floors?.find(
          (floor) => floor._id.toString() === doc.floor?.toString()
        );
        const area = floor?.areas?.find(
          (area) => area._id.toString() === doc.area?.toString()
        );
        const section = area?.sections?.find(
          (section) => section._id.toString() === doc.section?.toString()
        );
        const room = section?.rooms?.find(
          (room) => room._id.toString() === doc.room?.toString()
        );

        return {
          locationName: loc.name,
          floorName: floor?.floorName || null,
          areaName: area?.name || null,
          sectionName: section?.name || null,
          roomName: room?.name || null,
        };
      });

      const simplifiedLocation = doc.location.map((loc) => ({
        _id: loc._id,
        name: loc.name,
        kind: loc.kind,
        build: loc.building,
      }));

      delete doc.floor;
      delete doc.area;
      delete doc.room;

      return {
        ...doc,
        location: simplifiedLocation,
        locationDetails,
      };
    });

    res.status(200).json({
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(getDocById.length / limit),
        totalDocs: getDocById.length,
      },
      data: enrichedData,
    });
  } catch (error) {
    next(error);
  }
});

exports.getAssets = expressAsyncHandler(async (req, res, next) => {
  console.log(req.params.id, req.user.role);

  let query = {};

  if (["owner", "employee", "manager"].includes(req.user.role)) {
    query._id = req.params.id;
  } else {
    query._id = req.params.id;
    query.createBy = req.user._id;
  }

  let getDocById = await createAssetsnModel
    .findOne(query)
    .populate({ path: "subCategoryAssets", select: { assets: 0 } })
    .populate({
      path: "location",
      select: "name floors",
      populate: {
        path: "floors",
        populate: {
          path: "areas",
          populate: {
            path: "sections",
            populate: {
              path: "rooms",
              select: "name",
            },
          },
        },
      },
    })
    .populate({
      path: "createBy",
      select: "username identity",
    });

  if (!getDocById) {
    return res.status(403).json({ msg: "ليس لديك صلاحية وصول إلى الأصول" });
  }

  let locationDetails = [];

  getDocById.location.forEach((location) => {
    location.floors.forEach((floor) => {
      if (floor._id.toString() === getDocById.floor.toString()) {
        floor.areas.forEach((area) => {
          if (area._id.toString() === getDocById.area.toString()) {
            area.sections.forEach((section) => {
              section.rooms.forEach((room) => {
                if (room._id.toString() === getDocById.room.toString()) {
                  locationDetails.push({
                    locationName: location.name,
                    floorName: floor.floorName,
                    areaName: area.name,
                    sectionName: section.name,
                    roomName: room.name,
                  });
                }
              });
            });
          }
        });
      }
    });
  });

  delete getDocById.floor;
  delete getDocById.area;
  delete getDocById.room;

  getDocById.location.forEach((loc) => {
    delete loc.floors;
    loc.building = loc.building ? { name: loc.building.name } : {};
  });
  if (getDocById.pdf && Array.isArray(getDocById.pdf)) {
    getDocById.pdf.forEach((pdfItem) => {
      if (
        typeof pdfItem.pdf === "string" &&
        !pdfItem.pdf.includes(`${process.env.BASE_URL}/assets`)
      ) {
        pdfItem.pdf = `${process.env.BASE_URL}/assets/${pdfItem.pdf}`;
      }
    });
  }

  res.status(200).json({
    data: getDocById,
    locationDetails: locationDetails,
  });
});
exports.getMyAssets = expressAsyncHandler(async (req, res, next) => {
  let getDocById = await createAssetsnModel
    .find({
      createBy: req.user._id,
    })
    .populate({ path: "subCategoryAssets", select: { assets: 0 } })
    .populate("building")
    .populate({
      path: "location",
      select: "name floors",
      populate: {
        path: "floors",
        select: "floorName areas",
        populate: {
          path: "areas",
          select: "name sections",
          populate: {
            path: "sections",
            select: "name rooms",
            populate: {
              path: "rooms",
              select: "name assets",
            },
          },
        },
      },
    })
    .lean()
    .exec();

  if (!getDocById) {
    return next(new ApiError(`Sorry, no data found`, 404));
  }

  const enrichedData = getDocById.map((doc) => {
    const locationData = doc.location.map((loc) => {
      const floor = loc.floors.find(
        (floor) => floor._id.toString() === doc.floor.toString()
      );

      const area = floor?.areas.find(
        (area) => area._id.toString() === doc.area.toString()
      );
      const section = area?.sections.find(
        (section) => section._id.toString() === doc.section.toString()
      );
      const room = section?.rooms.find(
        (room) => room._id.toString() === doc.room.toString()
      );

      return {
        locationName: loc.name,
        floorName: floor?.floorName,
        areaName: area?.name,
        sectionName: section.name,
        roomName: room?.name,
      };
    });
    delete doc.floor;
    delete doc.area;
    delete doc.room;
    const simplifiedLocation = doc.location.map((loc) => ({
      _id: loc._id,
      name: loc.name,
      kind: loc.kind,
      build: loc.building,
    }));
    return {
      ...doc,
      location: simplifiedLocation,
      locationDetails: locationData,
    };
  });

  res.status(200).json({ data: enrichedData });
});
exports.getAssetsByCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let getDocById = await createAssetsnModel
    .find({
      subCategoryAssets: { $in: id },
    })
    .populate({ path: "subCategoryAssets", select: { assets: 0 } })
    .populate({
      path: "location",
      select: "name floors",
      populate: {
        path: "floors",
        select: "floorName areas",
        populate: {
          path: "areas",
          select: "name sections",
          populate: {
            path: "sections",
            select: "name rooms",
            populate: {
              path: "rooms",
              select: "name assets",
            },
          },
        },
      },
    })
    .lean()
    .exec();

  if (!getDocById) {
    return next(new ApiError(`Sorry, no data found`, 404));
  }

  const enrichedData = getDocById.map((doc) => {
    const locationData = doc.location.map((loc) => {
      const floor = loc.floors.find(
        (floor) => floor._id.toString() === doc.floor.toString()
      );

      const area = floor?.areas.find(
        (area) => area._id.toString() === doc.area.toString()
      );
      const section = area?.sections.find(
        (section) => section._id.toString() === doc.section.toString()
      );
      const room = section?.rooms.find(
        (room) => room._id.toString() === doc.room.toString()
      );

      return {
        locationName: loc.name,
        floorName: floor?.floorName,
        areaName: area?.name,
        sectionName: section.name,
        roomName: room?.name,
      };
    });
    delete doc.floor;
    delete doc.area;
    delete doc.room;
    const simplifiedLocation = doc.location.map((loc) => ({
      _id: loc._id,
      name: loc.name,
      kind: loc.kind,
      build: loc.building,
    }));
    return {
      ...doc,
      location: simplifiedLocation,
      locationDetails: locationData,
    };
  });

  res.status(200).json({ data: enrichedData });
});
exports.updateAssets = expressAsyncHandler(async (req, res, next) => {
  try {
    const findDocument = await createAssetsnModel.findById(req.params.id);

    if (!findDocument) {
      return next(
        new ApiError(
          `Sorry, can't find the document with ID: ${req.params.id}`,
          404
        )
      );
    }
    const imageKeys = ["pdf"];
    for (const key of imageKeys) {
      if (req.body[key] !== undefined || findDocument[key]?.length > 0) {
        console.log(findDocument[key]);
        if (
          findDocument[key].pdf &&
          findDocument[key].pdf !== req.body[key] &&
          findDocument[key].length > 0
        ) {
          const relativePathImage = findDocument[key];
          const filePath = path.join(
            __dirname,
            "../uploads/assets",
            "public",
            relativePathImage
          );

          try {
            fs.unlinkSync(filePath);
            console.log(`Deleted old image: ${filePath}`);
          } catch (err) {
            console.error(`Error deleting file: ${err}`);
          }
        }
      }
    }

    const updateData = req.body;
    for (const key of imageKeys) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }
    const updateDocById = await createAssetsnModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updateDocById) {
      return next(
        new ApiError(
          `Sorry, can't update the document with ID: ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({ data: updateDocById });
  } catch (error) {
    next(error);
  }
});
exports.updateAssetsStatus = expressAsyncHandler(async (req, res, next) => {
  console.log(req.body)
  try {
   
    const assets = await createAssetsnModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    const permission = await createPermissionModel.find({
      "mainCategoryAssets.allowedIds": { $in: [assets._id] },
    });
    const owners = await createEmployeeModel.find({
      $or: [
        { role: "owner" },
        {
          $and: [{ role: "manager" }, { building: assets._id }],
        },
        { permissions: { $in: permission._id } },
      ],
    });

    const notifications = owners.map((owner) => ({
      user: req.user.id,
      employee: owner._id,
      levels: "assets",
      allowed: assets._id,
      type: "request",
      text:
        req.body.status === "underUpdate"
          ? `${assets.assettype} طلب تعديل علي الاصل `
          : `${assets.assettype} طلب حذف علي الاصل`,
    }));
    await createNotificationModel.insertMany(notifications);
    res.status(200).json({ data: assets });
  } catch (error) {
    next(error);
  }
});
