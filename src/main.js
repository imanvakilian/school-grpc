import express from "express"
import { createServer } from "http";
import { config } from "dotenv";
import mainRouter from "./client/routes/index.routes.js";
config()
function main() {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    const server = createServer(app);
    const { PORT } = process.env;
    server.listen(PORT, () => {
        console.log(`Server > http://localhost:${PORT}`);
    });
    app.use(mainRouter);
}
main();