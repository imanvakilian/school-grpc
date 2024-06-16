import { Router } from "express";
import scoreController from "../controllers/score.controller.js";

const scoreRouter = Router();
scoreRouter.post("/", scoreController.create);
scoreRouter.get("/", scoreController.find);
scoreRouter.patch("/:id", scoreController.update);
scoreRouter.delete("/:id", scoreController.delete);
export default scoreRouter;