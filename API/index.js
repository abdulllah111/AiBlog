import express from "express";
import mongoose from "mongoose";

import {
  loginValidation,
  registerValidation,
  postCreateValidation,
} from "./validators/validation.js";

import { UserController, PostController } from "./controllers/index.js";
import { checkAuth, generatePosts, handeValidError } from "./utils/index.js";
import { DB_CONNECT } from "./configuration.js";

mongoose
  .connect(DB_CONNECT)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json());

app.get("/auth/me", checkAuth, UserController.getMe);
app.post("/auth/login", loginValidation, handeValidError, UserController.login);
app.post(
  "/auth/register",
  registerValidation,
  handeValidError,
  UserController.register
);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handeValidError,
  PostController.create
);
app.post(
  "/posts/autocreate/",
  checkAuth,
  generatePosts,
  PostController.autoCreate
);
app.put(
  "/posts",
  checkAuth,
  postCreateValidation,
  handeValidError,
  PostController.put
);
app.delete("/posts/:id", checkAuth, PostController.remove);

app.listen(3000, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Server is listening on port 3000");
});
