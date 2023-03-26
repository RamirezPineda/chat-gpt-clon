import { Router } from "express";
import ChatController from "../controllers/chat.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = Router();

// router.use(authenticate)

router.get("/chats-user/:id", ChatController.getUserChats);

router.post("/chats", ChatController.chatGPT);

export default router;
