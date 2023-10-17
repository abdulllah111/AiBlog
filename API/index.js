import express from "express";

import mongoose from "mongoose";

import { registerValidator } from "./validators/auth.js";
import * as UserController from "./controllers/UserController.js";



import checkAuth from "./utils/checkAuth.js";

mongoose
  .connect(
    "mongodb+srv://admin:abdularabp@cluster0.rck2y25.mongodb.net/aiblog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json());

app.get("/auth/me", checkAuth, UserController.getMe);
app.post("/auth/login", UserController.login);
app.post("/auth/register", registerValidator, UserController.register);

app.listen(3000, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Server is listening on port 3000");
});
