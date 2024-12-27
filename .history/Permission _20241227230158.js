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
