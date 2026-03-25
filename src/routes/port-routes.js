import express from "express";

import {
    createPostController,
    getFeedController,
    deletePostController,
    likePostController
} from "../controllers/post.controller.js";

import authMiddleware
from "../middlewares/auth.middleware.js";

import upload
from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createPostController
);

router.get(
    "/feed",
    authMiddleware,
    getFeedController
);

router.delete(
    "/:postId",
    authMiddleware,
    deletePostController
);

router.patch(
    "/like/:postId",
    authMiddleware,
    likePostController
);


export default router;