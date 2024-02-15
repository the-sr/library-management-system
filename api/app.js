const express = require("express");
const app = express();
const routes = require("./routes/index");

app.use(routes);

app.listen(3005, "localhost", (err) => {
    if (!err) {
        console.log("Server is listening at port 3005.....");
        console.log("Press Ctrl + C to close...");
    }
})