import { Router } from "express";
import followUser from "../controllers/follow/followUser.controller.js";
import getFollowers from "../controllers/follow/getUserFollowers.controller.js";
import getFollowing from "../controllers/follow/getUserFollowing.controller.js";
import unfollowUser from "../controllers/follow/unfollowUser.controller.js";

const route = Router();

route
  .get("/:id/followers", getFollowers)
  .get("/:id/following", getFollowing)
  .post("/", followUser)
  .delete("/", unfollowUser);

export default route;
