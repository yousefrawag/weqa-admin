const expressAsyncHandler = require("express-async-handler");
const createEmployeeModel = require("../Models/createEmployee");
const createPermissionModel = require("../Models/createPermission");
exports.createPermission = expressAsyncHandler(async (req, res, next) => {
  try {
    const { employee } = req.params; // الـ ID الخاص بالموظف
    const { building, assets, location, maincategories } = req.body; // البيانات الواردة

    // التحقق من وجود الموظف
    const user = await createEmployeeModel.findById(employee);
    if (!user) {
      throw new Error("Employee not found");
    }

    // إنشاء الصلاحية
    const permission = await createPermissionModel.create({
      employee,
      building,
      assets,
      location,
      maincategories,
    });


    res.status(201).json({
      status: "success",
      message: "Permission created successfully",
      data: permission,
    });
  } catch (error) {
    // معالجة الأخطاء
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
exports.permission = expressAsyncHandler(async (req, res, next) => {
  const url = req.originalUrl;
  const resource = url.split("/")[3];
  const method = req.method.toLowerCase(); 

  try {
  
    console.log("Resource:", resource);
    console.log("Method:", method);
    console.log("Employee ID:", req.user._id);
    console.log("Requested ID:", req.params.id);

    if (!resource || !req.params.id) {
      return res.status(400).json({ msg: "بيانات ناقصة" });
    }

   
    const permissions = await createPermissionModel.findOne({
      employee: req.user._id,
      "assets.actions": { $in: [method] }, 
      "assets.allowedIds": { $in: [req.params.id] }, 
    });


    if (!permissions) {
      return res.status(403).json({ msg: "ليس لديك صلاحية" });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "خطأ في السيرفر", error: error.message });
  }
});
