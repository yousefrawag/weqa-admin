const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");
const createMainCategoryModel = require("../Models/createMainCategory");
const createCategoryModel = require("../Models/createCategory");



exports.createCategory = expressAsyncHandler(async (req, res, next) => {
  const { maincategories, name } = req.body;

  // التحقق من صحة المدخلات
  if (!name || !maincategories) {
    return res.status(400).json({ msg: "Name and Main Category are required" });
  }

  // إنشاء جلسة جديدة لتقليل احتمالية وجود بيانات غير متزامنة
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // إنشاء التصنيف الجديد
    const subCategory = new createCategoryModel({
      name,
      maincategories,
      subcategories: [],
    });

    // التحقق من وجود التصنيف الرئيسي
    const parentCategory = await createMainCategoryModel
      .findById(maincategories)
      .session(session);

    if (!parentCategory) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ msg: "Not Found MainCategory" });
    }

    // إضافة التصنيف الجديد إلى التصنيف الرئيسي
    parentCategory.categories.push(subCategory._id);

    // حفظ التصنيف الجديد والتصنيف الرئيسي
    await subCategory.save({ session });
    await parentCategory.save({ session });

    // تأكيد العملية وإنهاء الجلسة
    await session.commitTransaction();
    session.endSession();

    // إرسال استجابة النجاح
    res.status(201).json({ status: "Success", data: subCategory });
  } catch (error) {
    // في حالة حدوث خطأ، يتم إلغاء العملية وإنهاء الجلسة
    await session.abortTransaction();
    session.endSession();

    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
});


exports.getCategories = factory.getAll(createCategoryModel);
exports.getCategory = factory.getOne(createCategoryModel);
exports.updateCategory = factory.updateOne(createCategoryModel);
exports.deleteCategory = factory.deleteOne(createCategoryModel);
