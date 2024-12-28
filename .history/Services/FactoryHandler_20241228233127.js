const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ApiError = require("../Resuble/ApiErrors");
const FeatureApi = require("../Utils/Feature");
const path = require("path");
const { default: rateLimit } = require("express-rate-limit");

exports.createOne = (Model) =>
  expressAsyncHandler(async (req, res) => {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    if (req.body.passwordDB) {
      req.body.passwordDB = await bcrypt.hash(req.body.passwordDB, 12);
    }
    const createDoc = await Model.create(req.body);
    res.status(201).json({ data: createDoc });
  });
  exports.getAll = (Model, keyword, populateFields = []) =>
    expressAsyncHandler(async (req, res) => {
      let filter = {};
      if (req.filterObject) {
        filter = req.filterObject;
      }
  
      // حساب عدد الوثائق في المجموعة
      const countDocs = await Model.countDocuments();
      
      // إعداد خاصية ApiFeatures مع الفلاتر المختلفة
      const ApiFeatures = new FeatureApi(Model.find(filter), req.query)
        .Fillter(Model)
        .Sort()
        .Fields()
        .Search(keyword)
        .Paginate(countDocs);
  
      const { MongooseQueryApi, PaginateResult } = ApiFeatures;
      
      // إضافة populate إذا كانت الحقول موجودة
      if (populateFields.length > 0) {
        populateFields.forEach(field => {
          MongooseQueryApi.populate(field);
        });
      }
  
      // تنفيذ الاستعلام
      const getDoc = await MongooseQueryApi;
  
      // إرسال الاستجابة
      res.status(200).json({ results: getDoc.length, PaginateResult, data: getDoc });
    });
  
    exports.getOne = (Model,  = []) =>
      expressAsyncHandler(async (req, res, next) => {
        let query = Model.findById(req.params.id);
    
        // إذا كانت خيارات populate ممررة
        if (populateOpt.length > 0) {
          populateOpt.forEach(opt => {
            console.log(opt);
            
            query = query.populate(opt);
          });
        }
    
        const getDocById = await query;
    
        // إذا لم يتم العثور على الوثيقة
        if (!getDocById) {
          return next(
            new ApiError(`Sorry, Can't get This ID From ID: ${req.params.id}`, 404)
          );
        }
    
        // إعادة النتيجة مع الوثيقة
        res.status(200).json({ data: getDocById });
      });
    
    

exports.deleteOne = (Model) =>
  expressAsyncHandler(async (req, res, next) => {
    const deleteDoc = await Model.findByIdAndDelete(req.params.id);

    if (!deleteDoc) {
      return next(
        new ApiError(`Sorry Can't Delete This ID :${req.params.id}`, 404)
      );
    }
    res.status(200).json({ message: "Delete Success", data: deleteDoc });
  });
exports.updateOne = (Model) =>
  expressAsyncHandler(async (req, res, next) => {
    const updateDocById = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,

      { new: true }
    );

    if (!updateDocById)
      next(
        new ApiError(
          `Sorry Can't Update This ID From ID :${req.params.id}`,
          404
        )
      );
    updateDocById.save();
    res.status(200).json({ data: updateDocById });
  });
exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message:
    "Too many requests For This IPAddress, Please Try Again After 15 minutes",
});
