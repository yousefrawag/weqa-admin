const expressAsyncHandler = require("express-async-handler");
const createSubCategoryModel = require("../Models/createSubCategory");
const factory = require("./FactoryHandler");

exports.createSubCategory = expressAsyncHandler(()=>{
    
        const subCategory = new Category({ name: "فرع شمال سيناء", parent: parentId });
        const parentCategory = await Category.findById(parentId);
      
        parentCategory.children.push(subCategory._id);
        await subCategory.save();
        await parentCategory.save();
      
        console.log("Subcategory added:", subCategory);
   
})
exports.getSubCategories = factory.getAll(createSubCategoryModel);
exports.getSubCategory = (model) => factory.getOne(model);
exports.updateSubCategory = factory.updateOne(createSubCategoryModel);
exports.deleteSubCategory = factory.deleteOne(createSubCategoryModel);
