const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const ApiError = require("../Resuble/ApiErrors");
const createUsersModel = require("../Models/createEmployee");

exports.createFirstOwnerAccount = async () => {
  const existingManager = await createUsersModel.findOne({
    email: "manager@gmail.com",
  });
  if (existingManager) {
    console.log("Manager account already exists");
    return;
  }

  await createUsersModel.create({
    username: "manager",
    email: "manager@gmail.com",
    phone: "01000000000",
    role: "owner",
    grander: "male",
    identity: 123456789,
    employeeNumber: 1997,
    address: {
      area: "North-Sina",
      city: "El-Arish",
      area: "",
      street: "125 atef Street",
      build: "16",
    },
    password: await bcrypt.hash("123456789", 12),
    confirmPassword: await bcrypt.hash("123456789", 12),
  });

  console.log("Manager account created successfully");
};

exports.getLoggedUserData = expressAsyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

exports.Login = expressAsyncHandler(async (req, res, next) => {
  let user = await createE.findOne({
    identity: req.body.identity,
  });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.DB_URL, {
      expiresIn: "365d",
    });
    return res.status(200).json({ data: user, token });
  } else if (
    teacher &&
    (await bcrypt.compare(req.body.password, teacher.password))
  ) {
    const token = jwt.sign({ userId: teacher._id }, process.env.DB_URL, {
      expiresIn: "365d",
    });
    return res.status(200).json({ data: teacher, token });
  } else {
    return res.status(500).json({
      status: "Error",
      msg: "خطا في اسم المستخدم او كلمه المرور",
    });
  }
});

exports.allowedTo = (...roles) =>
  expressAsyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({
          status: "Error",
          msg: "ليس لديك صلاحيه الوصول",
        })
      );
    }
    next();
  });

exports.protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  // استخراج التوكن من الهيدر
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return res.status(401).json({
      statusCode: "Error",
      msg: "لم يتم توفير رمز التفويض",
    });
  }

  try {
    // التحقق من صحة التوكن
    const decoded = jwt.verify(token, process.env.DB_URL);
    console.log(decoded);
    if (!decoded) {
      return res.status(401).json({
        statusCode: "Error",
        msg: "الرمز غير صالح. يرجى تسجيل الدخول مرة أخرى.",
      });
    }

    // العثور على المستخدم بناءً على الـID المستخرج من التوكن
    const currentUser = await createUsersModel.findById(decoded.userId);

    if (!currentUser) {
      return res.status(401).json({
        statusCode: "Error",
        msg: "المستخدم غير موجود",
      });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    // التحقق من نوع الخطأ وتخصيص الرسالة
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        statusCode: "Error",
        msg: "التوكن غير صحيح",
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        statusCode: "Error",
        msg: "التوكن منتهي الصلاحيه",
      });
    } else {
      return res.status(500).json({
        statusCode: "Error",
        msg: "حدث خطأ داخلي في الخادم.",
      });
    }
  }
});
