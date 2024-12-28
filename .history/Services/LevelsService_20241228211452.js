
const expressAsyncHandler = require("express-async-handler");
const createLevelsModel = require("../Models/createLevels");
const factory = require("./FactoryHandler");

exports.createLevels = expressAsyncHandler(async (req, res, next) => {
    const {category ,name}=req.body
     const subCategory = new createLevelsModel({
       name,
       category,
     });
     console.log(subCategory);
     
     const parentCategory = await createLevelsModel.findById(category);
     console.log(parentCategory);
     
     parentCategory.children = parentCategory.children || []; 
     parentCategory.children.push(subCategory._id);
     
     await subCategory.save();
     await parentCategory.save();
     res.status(201).json({ status: "Success", data: subCategory });
   });
exports.getLevels = factory.getAll(createLevelsModel);
exports.getLevel =(model) => factory.getOne(model);
exports.updateLevels = factory.updateOne(createLevelsModel);
exports.deleteLevels = factory.deleteOne(createLevelsModel);
