import { Router } from "express";
import createPost from "../controllers/post/addPost.controller.js";
import deletePost from "../controllers/post/deletePost.controller.js";
import getAllPosts from "../controllers/post/getAllPosts.controller.js";
import getPostOfSpecificUser from "../controllers/post/getSingleUserPost.controller.js";
import addComment from "../controllers/post/addComment.controller.js";
const route = Router();

route
  .get("/", getAllPosts)
  .get("/user/:id", getPostOfSpecificUser)
  .post("/", createPost)
  .post("/comment", addComment)
  .delete("/:id", deletePost);

export default route;
