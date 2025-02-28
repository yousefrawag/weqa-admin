const expressAsyncHandler = require("express-async-handler");
const createNotificationModel = require("../Models/createNotifacation");
const factory = require("./FactoryHandler");
const FeatureApi = require("../Utils/Feature");

exports.getNotifacations = expressAsyncHandler(async (req, res) => {
  const filter = { employee: req.user._id };

  const countDocs = await createNotificationModel.countDocuments(filter);
  const ApiFeatures = new FeatureApi(
    createNotificationModel.find(filter),
    req.query
  )
    .Fillter(createNotificationModel)
    .Sort({ createdAt: -1 })
    .Fields()
    .Search()
    .Paginate(countDocs);
  const { MongooseQueryApi, PaginateResult } = ApiFeatures;
  const getDoc = await MongooseQueryApi;

  res
    .status(201)
    .json({ results: getDoc.length, PaginateResult, data: getDoc });
});
exports.getNotifacation = factory.getOne(createNotificationModel);
exports.deleteNotifacation = factory.deleteOne(createNotificationModel);
