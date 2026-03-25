import express from "express";

import {
    followUserController,
    getUserProfileController
} from "../controllers/user.controller.js";

import authMiddleware
from "../middlewares/auth.middleware.js";

const router = express.Router();



router.patch(
    "/follow/:userId",
    authMiddleware,
    followUserController
);

router.get(
    "/profile/:userId",
    authMiddleware,
    getUserProfileController
);

export default router;