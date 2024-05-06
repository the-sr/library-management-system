const mongoose = require("mongoose");
const { DB } = require("./config");

let db_url = DB.PROTOCOL + "://" + DB.HOST + ":" + DB.PORT + "/" + DB.NAME;

mongoose.connect(db_url, {
    autoCreate: true,
    autoIndex: true
}).then(() => {
    console.log("DB connected successfully...")
}).catch((err) => {
    console.log("DB Connection error: " + err);
})