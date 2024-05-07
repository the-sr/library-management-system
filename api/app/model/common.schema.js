const mongoose = require("mongoose");

const trigger = {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
}

module.exports = { trigger };