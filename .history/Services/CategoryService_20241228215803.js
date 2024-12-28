const createCategoryModel = require("../Models/createCategory");
const factory = require("./FactoryHandler");

exports.createCategory =expressAsyncHandler(async (req, res, next) => {
    const {name}=req.body
     const subCategory = new createCategoryModel({
       name,
       levels:[],
       subCategory:[]
     });
    
     
     await subCategory.save();
     res.status(201).json({ status: "Success", data: subCategory });
   });
exports.getCategories = factory.getAll(createCategoryModel);
exports.getCategory = (model) => factory.getOne(model);
exports.updateCategory = factory.updateOne(createCategoryModel);
exports.deleteCategory = factory.deleteOne(createCategoryModel);
