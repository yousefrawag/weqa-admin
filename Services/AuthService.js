const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createEmployeeModel = require("../Models/createEmployee");

exports.createFirstOwnerAccount = async () => {
  const existingManager = await createEmployeeModel.findOne({
    email: "owner@gmail.com",
  });
  if (existingManager) {
    console.log("owner account already exists");
    return;
  }

  await createEmployeeModel.create({
    username: "owner",
    email: "owner@gmail.com",
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
    role: "owner",
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
  let user = await createEmployeeModel.findOne({
    identity: req.body.identity,
  });

  if (user && await bcrypt.compare(req.body.password, user.password)) {
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.DB_URL, {
      expiresIn: "1d",
    });
    return res.status(200).json({ data: user, token });
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
    const decoded = jwt.verify(token, process.env.DB_URL);
    if (!decoded) {
      return res.status(401).json({
        statusCode: "Error",
        msg: "الرمز غير صالح. يرجى تسجيل الدخول مرة أخرى.",
      });
    }

    const currentUser = await createEmployeeModel.findById(decoded.userId);

    if (!currentUser) {
      return res.status(401).json({
        statusCode: "Error",
        msg: "المستخدم غير موجود",
      });
    }

    req.user = currentUser;
    next();
  } catch (error) {
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
exports.updateLoggedUserPassword = expressAsyncHandler(async (req, res) => {
  const user = await createEmployeeModel.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
    },
    {
      new: true,
    }
  );
  const token = jwt.sign({ userId: user._id }, process.env.DB_URL, {
    expiresIn: "1d",
  });
  res.status(200).json({ data: user, token });
});
