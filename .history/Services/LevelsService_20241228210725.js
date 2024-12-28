
const createLevelsModel = require("../Models/createLevels");
const factory = require("./FactoryHandler");

exports.createLevels = expressAsyncHandler(async (req, res, next) => {
    const {levels}=req.body.levels
     const subCategory = new createSubCategoryModel({
       name: req.body.name,
       levels,
     });
     const parentCategory = await createLevelsModel.findById(levels);
   
     parentCategory.children.push(subCategory._id);
     await subCategory.save();
     await parentCategory.save();
     res.status(201).json({ status: "Success", data: subCategory });
   });
exports.getLevels = factory.getAll(createLevelsModel);
exports.getLevel =(model) => factory.getOne(model);
exports.updateLevels = factory.updateOne(createLevelsModel);
exports.deleteLevels = factory.deleteOne(createLevelsModel);
