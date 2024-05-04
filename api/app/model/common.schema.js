const mongoose = require("mongoose");

const trigger = {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
}
const status = {
    type: String,
    enum: ['active', 'inactive'],
    default: "inactive"
}
const created_by = {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null
}

module.exports = { trigger, status, created_by };