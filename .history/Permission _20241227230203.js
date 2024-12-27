const mongoose = require('mongoose');

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


const express = require('express');
const router = express.Router();
const Permission = require('./models/Permission');

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

module.exports = router;
