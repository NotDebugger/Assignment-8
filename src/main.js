import express from "express";
import "./common/db/mongoose.js";
import { userRouter } from "./app/user/user.route.js";
import { noteRouter } from "./app/note/note.route.js";
import { config } from "dotenv";

config();

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/notes", noteRouter);

// global error handler
app.use((err, req, res, next) => {
  res.status(400).json({
    message: err.message,
    success: false,
    stack: err.stack,
  });
});

app.listen(3000, () => console.log("server is running on port 3000"));
