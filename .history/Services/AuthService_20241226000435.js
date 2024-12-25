const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const ApiError = require("../Resuble/ApiErrors");
const createUsersModel = require("../Modules/createUsers");
const createTeachersModel = require("../Modules/createTeacher");
const createNotificationsModel = require("../Modules/createNotifiction");
const sendVerificationEmail = require("../Utils/SendCodeEmail");

exports.createFirstManagerAccount = async () => {
  const existingManager = await createUsersModel.findOne({
    email: "manager@gmail.com",
  });
  if (existingManager) {
    console.log("Manager account already exists");
    return;
  }

  const manager = await createUsersModel.create({
    username: "manager",
    lastName: "manager",
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
exports.SingUp = expressAsyncHandler(async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);

    const admin = await createUsersModel.findOne({ _id: req.body.teacher });

    // محاولة إرسال الإشعارات
    const notifications = [];

    notifications.push(
      await createNotificationsModel.create({
        type: "student-signup",
        msg: "تم إضافة طالب جديد",
        studentSignup: {
          studentName: req.body.firstName + " " + req.body.lastName,
          studentEmail: req.body.email,
          studentPhone: req.body.phone,
        },
      })
    );

    if (admin) {
      notifications.push(
        await createNotificationsModel.create({
          type: "student-signup",
          msg: "تم إضافة طالب جديد",
          studentSignup: {
            studentName: req.body.firstName + " " + req.body.lastName,
            studentEmail: req.body.email,
            studentPhone: req.body.phone,
          },
        })
      );
    }

    // إنشاء المستخدم بعد نجاح الإشعارات
    const user = await createUsersModel.create(req.body);

    // تحديث إشعارات المستخدم
    for (const notification of notifications) {
      notification.user = user._id;
      await notification.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.DB_URL, {
      expiresIn: "360d",
    });

    await user.save();

    return res.status(200).json({
      status: "success",
      msg: "تم ارسال اللينك بنجاح",
      data: user,
      token,
    });
  } catch (error) {
    console.log(error);
    return next(new ApiError("فشل في عملية التسجيل أو إرسال الإشعارات", 500));
  }
});

exports.Login = expressAsyncHandler(async (req, res, next) => {
  let user = await createUsersModel.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.email }],
  });

  let teacher = await createTeachersModel.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.email }],
  });
  // let clientIp =
  //   req.headers["x-forwarded-for"]?.split(",").shift() ||
  //   req.socket.remoteAddress;

  // إذا كان الـ IP هو "::ffff:127.0.0.1"، يتم تحويله إلى "127.0.0.1"
  // if (clientIp.startsWith("::ffff:")) {
  //   clientIp = clientIp.substring(7); // إزالة الـ "::ffff:"
  // }

  // user.ip = clientIp;

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
exports.findOrCreateGoogleUser = async (googleProfile) => {
  try {
    if (
      !googleProfile.id ||
      !googleProfile.emails ||
      !googleProfile.emails[0].value
    ) {
      throw new Error("Invalid Google profile data");
    }

    let user = await createUsersModel.findOne({ googleId: googleProfile.id });

    if (!user) {
      user = await createUsersModel.create({
        googleId: googleProfile.id,
        email: googleProfile.emails[0].value,
        firstName: googleProfile.displayName,
      });
    }

    return user;
  } catch (error) {
    console.error("Error in findOrCreateGoogleUser:", error);
    throw error;
  }
};

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
    const currentUser =
      (await createUsersModel.findById(decoded.userId)) ||
      (await createTeachersModel.findById(decoded.userId));

    if (!currentUser) {
      return res.status(401).json({
        statusCode: "Error",
        msg: "المستخدم غير موجود",
      });
    }

    // التحقق مما إذا قام المستخدم بتغيير كلمة المرور بعد إصدار التوكن
    if (currentUser.passwordChangedAt) {
      const passChangedTimestamp = parseInt(
        currentUser.passwordChangedAt.getTime() / 1000,
        10
      );
      if (passChangedTimestamp > decoded.iat) {
        return res.status(401).json({
          statusCode: "Error",
          msg: "لقد قمت بتغيير كلمة المرور. يرجى تسجيل الدخول مرة أخرى.",
        });
      }
    }

    // تحديد الدور وتعيين النموذج المناسب
    if (
      currentUser.role === "user" ||
      currentUser.role === "admin" ||
      currentUser.role === "manager"
    ) {
      req.model = createUsersModel;
    } else if (currentUser.role === "teacher") {
      req.model = createTeachersModel;
    } else {
      return res.status(403).json({
        statusCode: "Error",
        msg: "تم رفض الوصول. ليس لديك الإذن للقيام بهذا الإجراء.",
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
exports.verifyEmail = expressAsyncHandler(async (req, res) => {
  try {
    const { token } = req.query;

    const user = await createUsersModel.findOne({ verificationToken: token });
    if (!user) return res.status(400).send("التوكن غير صالح أو منتهي الصلاحية");

    // تحديث حالة المستخدم
    user.verificationToken = undefined;
    await user.save();

    // return res.redirect("/");
    return res.status(201).send({
      status: "success",
      msg: "تم التحقق من البريد الالكتروني بنجاح",
    });
  } catch (error) {
    res.status(500).send("حدث خطأ أثناء التحقق من البريد الإلكتروني");
  }
});

exports.forgetPassword = expressAsyncHandler(async (req, res, next) => {
  try {
    // البحث عن المستخدم أو المعلم بناءً على البريد الإلكتروني
    let user = await createUsersModel.findOne({ email: req.body.email });
    let teacher = await createTeachersModel.findOne({ email: req.body.email });
    const target = user || teacher;

    // إذا لم يتم العثور على المستخدم أو المعلم، يتم إرسال خطأ
    if (!target) {
      return next(
        new ApiError(`البريد الإلكتروني ${req.body.email} غير موجود.`)
      );
    }

    // إنشاء توكن عشوائي لإعادة تعيين كلمة المرور
    const tokenVerify = crypto.randomBytes(32).toString("hex");
    target.verificationToken = tokenVerify;

    // حفظ التوكن في قاعدة البيانات
    await target.save();

    // إرسال البريد الإلكتروني مع التوكن
    await sendVerificationEmail(target.email, tokenVerify, target.firstName);

    // إرسال رد بالنجاح
    res.status(200).json({ status: "success", msg: "تم إرسال الرمز بنجاح" });
  } catch (error) {
    // معالجة أي أخطاء غير متوقعة
    next(
      new ApiError(
        "حدث خطأ أثناء إرسال البريد الإلكتروني لإعادة تعيين كلمة المرور."
      )
    );
  }
});

exports.restNewPassword = (UserPassword) =>
  expressAsyncHandler(async (req, res, next) => {
    const { email, setNewPassword } = req.body;

    // 1) العثور على المستخدم أو المعلم بناءً على البريد الإلكتروني
    const user = await createUsersModel.findOne({ email });
    const teacher = await createTeachersModel.findOne({ email });

    if (!user && !teacher) {
      return next(new ApiError(`لايوجد ايميل بهذا الاسم ${email}`, 404));
    }

    const target = user || teacher;
    // 3) تحديث كلمة المرور إذا كانت العملية تتعلق بكلمة المرور
    if (UserPassword === "password") {
      target.password = await bcrypt.hash(setNewPassword, 12);
    }

    await target.save();

    // 5) إنشاء وإرجاع رمز JWT إذا كانت العملية تتعلق بكلمة المرور
    if (UserPassword === "password") {
      const token = jwt.sign({ userId: target._id }, process.env.DB_URL, {
        expiresIn: "90d",
      });
      return res.status(200).json({ token });
    }

    res
      .status(200)
      .json({ status: "success", msg: "تم تغيير الرقم السري بنجاح" });
  });
