import {Router} from 'express';
import createPost from '../controllers/post/addPost.controller.js';
import deletePost from '../controllers/post/deletePost.controller.js';
import getAllPosts from '../controllers/post/getAllPosts.controller.js';
const route = Router();

route.get("/", getAllPosts).post("/", createPost).delete("/:id", deletePost)

export default route;