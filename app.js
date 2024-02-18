const express = require("express");
const asyncWrapper = require("./middleware/async");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/error-handler");
//middleware

app.use(express.json());
app.use(express.static("./public"));

//Router

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware)

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening to the port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
