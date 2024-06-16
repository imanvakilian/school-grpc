import { Router } from "express";
import userRouter from "./user.routes.js";
import subjectRouter from "./subject.routes.js";
import scoreRouter from "./score.routes.js";

const mainRouter = Router();
mainRouter.get("/", (req, res) => {
    res.send("Hello grpc");
})
mainRouter.use("/user", userRouter);
mainRouter.use("/subject", subjectRouter);
mainRouter.use("/score", scoreRouter);
export default mainRouter;