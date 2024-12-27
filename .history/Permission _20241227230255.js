const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Permission = require('./models/Permission');
const permissionSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  resource: { type: String, required: true }, // مثل 'lectures', 'sections', 'students'
  actions: { 
    create: { type: Boolean, default: false },
    read: { type: Boolean, default: false },
    update: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model('Permission', permissionSchema);




// تحديث صلاحيات الأدمن
router.post('/update-permissions', async (req, res) => {
  try {
    const { adminId, resource, actions } = req.body;

    // تحديث الصلاحيات
    let permission = await Permission.findOne({ adminId, resource });
    if (!permission) {
      permission = new Permission({ adminId, resource, actions });
    } else {
      permission.actions = actions;
    }

    await permission.save();
    res.status(200).json({ message: 'Permissions updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating permissions', error });
  }
});



const checkPermission = (resource, action) => {
  return async (req, res, next) => {
    try {
      const adminId = req.user.id; // معرف الأدمن من الجلسة أو التوكن
      const permission = await Permission.findOne({ adminId, resource });

      if (permission && permission.actions[action]) {
        next();
      } else {
        res.status(403).json({ message: 'Access denied' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error checking permissions', error });
    }
  };
};

module.exports = checkPermission;


const checkPermission = require('./middlewares/checkPermission');

// مثال: حذف محاضرة
router.delete('/lectures/:id', checkPermission('lectures', 'delete'), async (req, res) => {
  try {
    // حذف المحاضرة
    res.status(200).json({ message: 'Lecture deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lecture', error });
  }
});

module.exports = router;
