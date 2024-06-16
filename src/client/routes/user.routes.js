import { Router } from "express";
import userController from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.post("/", userController.create);
userRouter.get("/", userController.find);
userRouter.get("/:id", userController.findOne);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.delete);

export default userRouter;