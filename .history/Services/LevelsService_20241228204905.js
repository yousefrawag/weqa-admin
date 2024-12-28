
const expressAsyncHandler = require("express-async-handler");
const createLevelsModel = require("../Models/createLevels");
const factory = require("./FactoryHandler");

exports.createLevels = expressAsyncHandler((req, res) => {

        const subCategory = new Category({ name: "فرع شمال سيناء", parent: parentId });
        const parentCategory = await Category.findById(parentId);
      
        parentCategory.children.push(subCategory._id);
        await subCategory.save();
        await parentCategory.save();
      
        console.log("Subcategory added:", subCategory);
      };
      addSubcategory("ID_OF_PARENT_CATEGORY"); // ضع معرف وزارة الصحة هنا
      
})

factory.createOne(createLevelsModel);
exports.getLevels = factory.getAll(createLevelsModel);
exports.getLevel =(model) => factory.getOne(model);
exports.updateLevels = factory.updateOne(createLevelsModel);
exports.deleteLevels = factory.deleteOne(createLevelsModel);
