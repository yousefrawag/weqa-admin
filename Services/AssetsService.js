const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createAssetsnModel = require("../Models/createAssets");
const createSubCategoryAssetsModel = require("../Models/createSubCategoryAssets");
const createCategoryAssetsModel = require("../Models/createCategoryAssets");
const createMainCategoryAssetsModel = require("../Models/createMainCategoryAssets");
const ApiError = require("../Resuble/ApiErrors");
const fs = require("fs");
const createLocationModel = require("../Models/createLocation");
const path = require("path");

exports.resizepdf = (type) =>
  expressAsyncHandler(async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
      return next();
    }
    req.body.createBy = req.user._id;
    req.body.pdf = [];
    req.files.pdf.forEach((file) => {
      req.body.pdf.push({
        pdf: file.filename,
      });
    });

    next();
  });

exports.createAssets = expressAsyncHandler(async (req, res) => {
  const { subCategoryAssets, continued } = req.body;
  const building = await createLocationModel.findById(req.body.location);
  req.body.building = building.building._id;
  const levelsModel =
    continued === "first"
      ? "maincategoryassets"
      : continued === "second"
      ? "categoryassets"
      : "subcategoryassets";
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

    res.status(201).json({ status: "Success", data: populatedAssets });
  } catch (error) {
    res.status(400).json({ status: "Error", msg: error.message });
  }
});

exports.getAssetss = expressAsyncHandler(async (req, res, next) => {
  try {
    let filter =
      req.user.role === "user" ? { building: req.user.building } : {};

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
    next(error); // تمرير الخطأ إلى معالج الأخطاء
  }
});

exports.getAssets = expressAsyncHandler(async (req, res, next) => {
  let getDocById = await createAssetsnModel
    .findById(req.params.id)
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
    });

  if (!getDocById) {
    return next(
      new ApiError(`Sorry, can't get this ID from ID: ${req.params.id}`, 404)
    );
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

  if (locationDetails.length === 0) {
    return res.status(404).json({ msg: "No matching location details found" });
  }
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

          // حذف الصورة القديمة إذا كانت موجودة
          try {
            fs.unlinkSync(filePath); // احذف الملف القديم من النظام
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

    // تحديث المستند بناءً على ID
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

exports.deleteAssets = factory.deleteOne(createAssetsnModel);
