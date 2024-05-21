const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

require("./config/mongoose.config");
const routes = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));

app.use(routes);

app.use((error, req, res, next) => {
    let status = error.status ?? error;
    let msg = error.msg ?? error;
    res.status(status).json({
        result: null,
        status: false,
        msg: msg
    });
});

app.listen(3005, "localhost", (err) => {
    if (!err) {
        console.log("Server is listening to port 3005.....");
        console.log("Press Ctrl + C to close...");
    }
});