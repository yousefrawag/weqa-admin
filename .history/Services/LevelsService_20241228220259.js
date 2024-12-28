
const expressAsyncHandler = require("express-async-handler");
const createLevelsModel = require("../Models/createLevels");
const factory = require("./FactoryHandler");
const createCategoryModel = require("../Models/createCategory");

exports.createLevels = expressAsyncHandler(async (req, res, next) => {
    const {category ,name}=req.body
     const subCategory = new createLevelsModel({
       name,
       category,
       children:[]
     });
    //  console.log(subCategory);
     
     const parentCategory = await createCategoryModel.findById(category);
     if (!parentCategory) {
        if (!quiz) {
            return res.status(404).json({ msg: "لا يوجد كويز بهذا المعرف" });
          }
     }
     parentCategory.levels.push(subCategory._id);
     
     await subCategory.save();
    await parentCategory.save();
     res.status(201).json({ status: "Success", data: subCategory });
   });
exports.getLevels = factory.getAll(createLevelsModel);
exports.getLevel =(model) => factory.getOne(model);
exports.updateLevels = factory.updateOne(createLevelsModel);
exports.deleteLevels = factory.deleteOne(createLevelsModel);
