import express from "express";

import mongoose from "mongoose";


import { loginValidator, registerValidator } from "./validators/validation.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";





import checkAuth from "./utils/checkAuth.js";
import generatePosts from "./utils/generatePosts.js";
import Post from "./models/Post.js";

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
app.post("/auth/login", loginValidator, UserController.login);
app.post("/auth/register", registerValidator, UserController.register);

app.get("/posts", PostController.getAll);
app.get("/posts/_id", PostController.getOne);
// app.post("/posts", checkAuth, PostController.create);
app.post("/posts/autocreate/", checkAuth, generatePosts, PostController.autoCreate);
// app.put("/posts", checkAuth, PostController.put);
// app.delete("/posts", checkAuth, PostController.delete);



app.listen(3000, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Server is listening on port 3000");
});
