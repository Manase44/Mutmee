import { Router } from "express";
import getALlArticles from "../controllers/articles/getAllArticles.controller.js";
import createArticle from "../controllers/articles/createArticle.controller.js";
import deletingArticle from "../controllers/articles/deleteArticle.conroller.js";
import updatingArticle from "../controllers/articles/updateArticle.conroller.js";
import getSpecificUserArticles from "../controllers/articles/getArticlesOfASpecificUser.controller.js";
import getSingleArticle from "../controllers/articles/getSpecificArticle.controller.js";
const route = Router();

route
  .get("/", getALlArticles)
  .get("/:id", getSingleArticle)
  .get("/user", getSpecificUserArticles)
  .post("/", createArticle)
  .patch("/:id", updatingArticle)
  .delete("/:id", deletingArticle);

export default route;
