const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
const createCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name MainCategory"],
    },
    maincategories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "maincategories",
      required: true,
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategories",
      },
    ],
  },
  { timestamps: true }
);
mongoose.set("strictPopulate", false);

createCategory.pre(/^find/, function(next) {

  this.populate({
    path: 'subcategories', // حقل subcategories الذي يحتوي على مصفوفة من Object IDs
    select: 'name' // تحديد الحقول التي سيتم إرجاعها من الsubcategories
  });
  next();
});

const createCategoryModel = mongoose.model("categories", createCategory);
module.exports = createCategoryModel;
