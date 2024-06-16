import { Router } from "express";
import subjectController from "../controllers/subject.controller.js";

const subjectRouter = Router();
subjectRouter.post("/", subjectController.create);
subjectRouter.get("/", subjectController.find);
subjectRouter.get("/:id", subjectController.findOne);
subjectRouter.put("/:id", subjectController.update);
subjectRouter.delete("/:id", subjectController.delete);
export default subjectRouter;