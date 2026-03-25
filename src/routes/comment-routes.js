import express from "express";

import {
    addCommentController,
    deleteCommentController
} from "../controllers/comment.controller.js";

import authMiddleware
from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/:postId",
    authMiddleware,
    addCommentController
);

router.delete(
    "/:commentId",
    authMiddleware,
    deleteCommentController
);

export default router;