const multer = require("multer");
const ApiError = require("../Resuble/ApiErrors");
const path = require("path");

const MulterOptions = () => {
  const storage = multer.memoryStorage();
  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only Image Allowed", 400), false);
    }
  };
  const upload = multer({ storage: storage, fileFilter: multerFilter });
  return upload;
};
const MulterOptionsPDF = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
      
      const uploadPath = path.resolve(__dirname, "../upload/assets");
      
      require("fs").mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, "pdf-" + uniqueSuffix + path.extname(file.originalname));
    },
  });

  const fileFilter = function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("نوع الملف غير مسموح. يرجى رفع ملف PDF فقط"), false);
    }
  };

  return multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  });
};

exports.UploadSingleImage = (ImageName) => MulterOptions().single(ImageName);

exports.UploadMultiPDF = (ArrOfImage) => MulterOptionsPDF().fields(ArrOfImage);
