const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createTicketModel = require("../Models/createTicket");
const createNotificationModel = require("../Models/createNotifacation");
const createEmployeeModel = require("../Models/createEmployee");

exports.createTicket = expressAsyncHandler(async (req, res, next) => {
  console.log("asdasd");
  try {
    const newTicket = new createTicketModel({
      user: req.user.id,
      messages: [{ senderId: req.user.id, text: req.body.message }],
      priority: req.body.priority || "low",
      Categoray:req.body?.Categoray
    });
   
    await newTicket.save();

    const owners = await createEmployeeModel.find({ role: "owner" });


    const notifications = owners.map((owner) => ({
      user: req.user.id,
      employee: owner._id,
      type: "support",
      text: "تم إضافة تذكرة جديدة",
    }));
    await createNotificationModel.insertMany(notifications);

   return res.status(201).json(newTicket);
  } catch (err) {
    next(err);
  }
});

exports.getTickets = factory.getAll(createTicketModel);

exports.getTicket = factory.getOne(createTicketModel);
exports.getMyTickets = expressAsyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tickets = await createTicketModel.find({ user: userId });

    res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
});
exports.updateTicket = factory.updateOne(createTicketModel);
exports.deleteTicket = factory.deleteOne(createTicketModel);
